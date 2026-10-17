import socket
import sys

HOST, PORT = "localhost", 8000


def raw_request(raw):
    with socket.create_connection((HOST, PORT), timeout=15) as s:
        s.sendall(raw.encode())
        data = b""
        while chunk := s.recv(4096):
            data += chunk
    return data


def get(path):
    raw = f"GET {path} HTTP/1.1\r\nHost: {HOST}\r\nConnection: close\r\n\r\n"
    response = raw_request(raw)
    head, _, body = response.partition(b"\r\n\r\n")
    status_line = head.split(b"\r\n")[0].decode()
    status = int(status_line.split(" ")[1])
    return status, head.decode("iso-8859-1"), body


def test_unknown_api_route_is_404():
    status, _, _ = get("/api/xyz")
    assert status == 404, f"expected 404, got {status}"


def test_existing_user_is_200():
    status, _, body = get("/api/users/octocat")
    contains_user = b"octocat" in body
    assert status == 200, f"expected 200, got {status}"
    assert contains_user, "body does not contain 'octocat'"


def test_missing_user_is_404():
    status, _, _ = get("/api/users/leticiamaironrenan")
    assert status == 404, f"expected 404, got {status}"


def test_invalid_username_is_400():
    status, _, _ = get("/api/users/..%2Forgs")
    assert status == 400, f"expected 400, got {status}"


def test_path_traversal_is_404():
    status, _, body = get("/../server/server.py")
    contains_import = b"import socket" in body
    assert status == 404, f"expected 404, got {status}"
    assert not contains_import, "body contains 'import socket'"

    status, _, body = get("/%2e%2e/server/server.py")
    contains_import = b"import socket" in body
    assert status == 404, f"expected 404, got {status}"
    assert not contains_import, "body contains 'import socket'"


def test_home_page_is_html():
    status, head, _ = get("/")
    contains_home = "text/html" in head
    assert status == 200, f"expected 200, got {status}"
    assert contains_home, "header does not contain 'text/html'"


def test_malformed_request_is_400():
    request = raw_request("TEST\r\n\r\n").startswith(b"HTTP/1.1 400")
    assert request, "expected a 400 response for a malformed request"


if __name__ == "__main__":
    tests = [
        (name, func)
        for name, func in globals().items()
        if name.startswith("test_") and callable(func)
    ]
    failed = 0
    for name, func in tests:
        try:
            func()
            print(f"PASS  {name}")
        except AssertionError as error:
            failed += 1
            print(f"FAIL  {name}  ({error})")
        except ConnectionRefusedError:
            print("The server is not running. Start it with: python server/server.py")
            sys.exit(2)
    print(f"\n{len(tests) - failed}/{len(tests)} passed")
    sys.exit(1 if failed else 0)
