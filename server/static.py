import mimetypes
import os
from urllib.parse import unquote

DIST_DIR = os.path.realpath(os.path.join(os.path.dirname(__file__), "..", "dist"))

MIME_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".json": "application/json",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".png": "image/png",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
}


def content_type_for(file_path):
    extension = os.path.splitext(file_path)[1].lower()
    if extension in MIME_TYPES:
        return MIME_TYPES[extension]
    guessed, _ = mimetypes.guess_type(file_path)
    return guessed or "application/octet-stream"


def not_found():
    return 404, "text/plain; charset=utf-8", b"404 Not Found"


def serve_static(path):
    decoded_path = unquote(path.split("?")[0])

    if decoded_path.endswith("/"):
        decoded_path += "index.html"

    full_path = os.path.realpath(os.path.join(DIST_DIR, decoded_path.lstrip("/")))

    if not full_path.startswith(DIST_DIR + os.sep):
        return not_found()

    if not os.path.isfile(full_path):
        return not_found()

    with open(full_path, "rb") as f:
        body = f.read()

    return (200, content_type_for(full_path), body)


if __name__ == "__main__":
    cases = [
        "/",
        "/index.html",
        "/index.html?v=1",
        "/favicon.svg",
        "/does-not-exist.txt",
        "/../server/static.py",
        "/%2e%2e/server/static.py",
    ]
    for case in cases:
        status, content_type, body = serve_static(case)
        print(f"{case:30} -> {status} {content_type} ({len(body)} bytes)")
