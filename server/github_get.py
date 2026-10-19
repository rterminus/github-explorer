import json
import os
import socket
import ssl
import time
from urllib.parse import urlsplit

API_HOST = "api.github.com"
CACHE_TTL_SECONDS = 60
MAX_REDIRECTS = 5
REDIRECT_STATUSES = (301, 302, 307, 308)

CACHE: dict[str, tuple[float, int, bytes]] = {}


def build_github_request(path: str, token: str | None) -> bytes:
    if not path.startswith("/"):
        raise ValueError("O caminho precisa começar com '/'.")
    # Evita injeção de headers via CR/LF no caminho
    if "\r" in path or "\n" in path or " " in path:
        raise ValueError("Caminho inválido: contém espaços ou quebras de linha.")

    auth_header = f"Authorization: Bearer {token}\r\n" if token else ""

    request = (
        f"GET {path} HTTP/1.1\r\n"
        f"Host: {API_HOST}\r\n"
        "Accept: application/vnd.github+json\r\n"
        "User-Agent: github-explorer-redes\r\n"
        f"{auth_header}"
        "Connection: close\r\n"
        "\r\n"
    )

    return request.encode("utf-8")


def fetch_raw_data(request_bytes: bytes) -> bytes:
    context = ssl.create_default_context()
    try:
        with socket.create_connection((API_HOST, 443), timeout=10) as sock:
            with context.wrap_socket(sock, server_hostname=API_HOST) as safe_sock:
                safe_sock.sendall(request_bytes)
                chunks = []
                while True:
                    chunk = safe_sock.recv(4096)
                    if chunk == b"":
                        break
                    chunks.append(chunk)
                return b"".join(chunks)

    except OSError as e:
        # OSError cobre gaierror, timeout, ConnectionError e ssl.SSLError
        raise ConnectionError(
            f"Falha de rede ao tentar acessar a API do GitHub: {e}"
        ) from e


def parse_http_response(raw_data: bytes) -> tuple[int, dict, bytes]:
    if not raw_data:
        raise ValueError("Resposta vazia do servidor.")

    head, separator, body_bytes = raw_data.partition(b"\r\n\r\n")
    if not separator:
        raise ValueError("Resposta HTTP malformada: fim dos headers não encontrado.")

    # Headers HTTP são latin-1/ASCII; latin-1 nunca levanta exceção de decodificação
    lines = head.decode("latin-1").split("\r\n")

    status_parts = lines[0].split(" ", 2)
    if len(status_parts) < 2 or not status_parts[1].isdigit():
        raise ValueError(f"Linha de status inválida: {lines[0]!r}")
    status = int(status_parts[1])

    headers_dict = {}
    for line in lines[1:]:
        if ":" in line:
            key, value = line.split(":", 1)
            headers_dict[key.strip().lower()] = value.strip()

    return status, headers_dict, body_bytes


def decode_chunked_body(body_bytes: bytes) -> bytes:
    parts = []
    i = 0

    while i < len(body_bytes):
        end_of_line = body_bytes.find(b"\r\n", i)
        if end_of_line == -1:
            raise ValueError("Corpo chunked truncado: tamanho do chunk incompleto.")

        size_hex = body_bytes[i:end_of_line].split(b";")[0].strip()
        try:
            size = int(size_hex, 16)
        except ValueError as e:
            raise ValueError(f"Tamanho de chunk inválido: {size_hex!r}") from e

        if size == 0:
            return b"".join(parts)

        start = end_of_line + 2
        data = body_bytes[start:start + size]
        if len(data) != size:
            raise ValueError("Corpo chunked truncado: chunk incompleto.")

        parts.append(data)
        # +2 para pular o \r\n que vem no final de cada chunk
        i = start + size + 2

    raise ValueError("Corpo chunked truncado: chunk final (0) não encontrado.")


def resolve_redirect_path(location: str) -> str:
    """Converte o header Location em um caminho, aceitando só o host da API."""
    parts = urlsplit(location)
    if parts.netloc and parts.netloc != API_HOST:
        # Nunca seguir para outro host: o token vazaria para um terceiro
        raise RuntimeError(f"Redirecionamento para host não permitido: {parts.netloc}")
    if parts.scheme and parts.scheme != "https":
        raise RuntimeError("Redirecionamento para esquema não seguro.")

    path = parts.path or "/"
    if parts.query:
        path += f"?{parts.query}"
    return path


def github_get(path: str, token: str | None = None) -> tuple[int, bytes]:
    if token is None:
        token = os.getenv("GITHUB_TOKEN")

    cached = CACHE.get(path)
    if cached:
        expires_at, status_cache, body_cache = cached
        if time.time() < expires_at:
            print("[CACHE] Retornando dados da memória!")
            return (status_cache, body_cache)
        del CACHE[path]

    current_path = path
    for _ in range(MAX_REDIRECTS + 1):
        request_bytes = build_github_request(current_path, token)
        raw_data = fetch_raw_data(request_bytes)
        status, headers_dict, body_bytes = parse_http_response(raw_data)

        if status in REDIRECT_STATUSES and "location" in headers_dict:
            current_path = resolve_redirect_path(headers_dict["location"])
            continue
        break
    else:
        raise RuntimeError("Redirecionamentos demais ao acessar a API do GitHub.")

    if status == 429 or (
        status == 403 and headers_dict.get("x-ratelimit-remaining") == "0"
    ):
        raise RuntimeError("Limite de requisições da API do GitHub atingido.")

    if "chunked" in headers_dict.get("transfer-encoding", "").lower():
        body_bytes = decode_chunked_body(body_bytes)

    # Só cacheia respostas bem-sucedidas, para não repetir erros temporários
    if status == 200:
        CACHE[path] = (time.time() + CACHE_TTL_SECONDS, status, body_bytes)

    return (status, body_bytes)


if __name__ == "__main__":
    path = "/users/octocat"
    status, body_bytes = github_get(path)
    print(f"Status: {status}")
    print("Corpo da Resposta (JSON):")
    if body_bytes:
        body_str = body_bytes.decode("utf-8", errors="replace")
        try:
            body_json = json.loads(body_str)
            print(json.dumps(body_json, indent=4, ensure_ascii=False))
        except json.JSONDecodeError:
            print(body_str)