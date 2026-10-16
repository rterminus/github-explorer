import json
import re
import socket
import threading
from urllib.parse import unquote

HOST, PORT = "0.0.0.0", 8000
USERNAME_RE = re.compile(r"^[A-Za-z0-9-]{1,39}$")
REASONS = {200: "OK", 204: "No Content", 400: "Bad Request", 403: "Forbidden",
           404: "Not Found", 500: "Internal Server Error", 502: "Bad Gateway"}


# Integrante 2 — trocar pelo github_get real na integração.
def github_get(path):
    return 200, b'{"login": "octocat"}'


# Integrante 3 — static.py; até lá, 404 para tudo fora de /api/.
try:
    from static import serve_static
except ImportError:
    def serve_static(path):
        return 404, "text/plain; charset=utf-8", b"Not Found"


def error(status, message):
    return status, "application/json", json.dumps({"message": message}).encode()


def route(method, path):
    path = path.split("?", 1)[0]
    if not path.startswith("/api/"):
        return serve_static(path)
    if method != "GET":
        return error(404, "Not found")

    parts = path[len("/api/"):].split("/")
    if parts[0] != "users" or len(parts) not in (2, 3) or (len(parts) == 3 and parts[2] != "repos"):
        return error(404, "Not found")

    username = unquote(parts[1])
    if not USERNAME_RE.match(username):
        return error(400, "Invalid username")

    gh_path = f"/users/{username}" + ("/repos?sort=updated&per_page=4" if len(parts) == 3 else "")
    try:
        status, body = github_get(gh_path)
    except OSError:  # URLError, timeout, conexão recusada...
        return error(502, "GitHub unreachable")
    return status, "application/json", body


def build_response(status, content_type, body):
    head = (
        f"HTTP/1.1 {status} {REASONS.get(status, '')}\r\n"
        f"Content-Type: {content_type}\r\n"
        f"Content-Length: {len(body)}\r\n"
        "Access-Control-Allow-Origin: *\r\n"
        "Access-Control-Allow-Methods: GET, OPTIONS\r\n"
        "Access-Control-Allow-Headers: *\r\n"
        "Connection: close\r\n\r\n"
    )
    return head.encode() + body


def read_request(conn):
    data = b""
    while b"\r\n\r\n" not in data:
        chunk = conn.recv(4096)
        if not chunk:
            break
        data += chunk
        if len(data) > 65536:
            raise ValueError("headers too large")
    head = data.split(b"\r\n\r\n", 1)[0].decode("iso-8859-1")
    lines = head.split("\r\n")
    method, path, _version = lines[0].split(" ")
    headers = {}
    for line in lines[1:]:
        if ":" in line:
            k, v = line.split(":", 1)
            headers[k.strip().lower()] = v.strip()
    return method, path, headers


def handle(conn):
    with conn:
        try:
            conn.settimeout(10)
            try:
                method, path, _headers = read_request(conn)
            except (ValueError, UnicodeDecodeError):
                resp = error(400, "Malformed request")
            else:
                resp = (204, "text/plain", b"") if method == "OPTIONS" else route(method, path)
        except socket.timeout:
            return
        except Exception:
            resp = error(500, "Internal server error")
        try:
            conn.sendall(build_response(*resp))
        except OSError:
            pass


def main():
    srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    srv.bind((HOST, PORT))
    srv.listen()
    print(f"Listening on http://localhost:{PORT}")
    while True:
        conn, _addr = srv.accept()
        threading.Thread(target=handle, args=(conn,), daemon=True).start()


if __name__ == "__main__":
    main()
