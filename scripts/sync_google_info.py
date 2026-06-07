#!/usr/bin/env python3
"""Sync the Google Drive `Info` folder into this repository.

The script uses the pre-authenticated `gws` CLI. It recursively lists Drive
children, downloads binary files, exports Google Workspace documents into useful
local formats, and writes a manifest so future runs skip unchanged files.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
from pathlib import Path
from typing import Any, Dict, Iterable, List, Tuple

GOOGLE_FOLDER_MIME = "application/vnd.google-apps.folder"
EXPORT_MAP: Dict[str, Tuple[str, str]] = {
    "application/vnd.google-apps.document": ("text/markdown", ".md"),
    "application/vnd.google-apps.spreadsheet": ("text/csv", ".csv"),
    "application/vnd.google-apps.presentation": ("text/plain", ".txt"),
    "application/vnd.google-apps.drawing": ("image/png", ".png"),
}
FALLBACK_EXPORT_MAP: Dict[str, Tuple[str, str]] = {
    "application/vnd.google-apps.document": ("text/plain", ".txt"),
    "application/vnd.google-apps.spreadsheet": ("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", ".xlsx"),
    "application/vnd.google-apps.presentation": ("application/pdf", ".pdf"),
}


def run(cmd: List[str], *, capture: bool = True) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        cmd,
        text=True,
        stdout=subprocess.PIPE if capture else None,
        stderr=subprocess.PIPE if capture else None,
        check=False,
    )


def gws_json(args: List[str]) -> Any:
    proc = run(["gws", *args])
    if proc.returncode != 0:
        raise RuntimeError(f"gws failed: {' '.join(args)}\nSTDOUT:\n{proc.stdout}\nSTDERR:\n{proc.stderr}")
    return json.loads(proc.stdout or "{}")


def safe_name(name: str) -> str:
    name = re.sub(r"[\\/:*?\"<>|]+", "-", name).strip()
    name = re.sub(r"\s+", " ", name)
    return name or "untitled"


def file_hash(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def list_children(folder_id: str) -> List[Dict[str, Any]]:
    q = f"'{folder_id}' in parents and trashed = false"
    params = {
        "q": q,
        "fields": "files(id,name,mimeType,modifiedTime,size,md5Checksum,webViewLink)",
        "pageSize": 1000,
        "supportsAllDrives": True,
        "includeItemsFromAllDrives": True,
    }
    data = gws_json(["drive", "files", "list", "--params", json.dumps(params), "--format", "json"])
    return data.get("files", [])


def download_binary(file_id: str, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    params = {"fileId": file_id, "alt": "media", "supportsAllDrives": True}
    proc = run(["gws", "drive", "files", "get", "--params", json.dumps(params), "--output", str(destination)], capture=True)
    if proc.returncode != 0:
        # Newer gws exposes files.download for some binary operations; retry once.
        proc = run(["gws", "drive", "files", "download", "--params", json.dumps({"fileId": file_id}), "--output", str(destination)], capture=True)
    if proc.returncode != 0:
        raise RuntimeError(f"download failed for {file_id}:\n{proc.stdout}\n{proc.stderr}")


def export_workspace_file(file_id: str, mime_type: str, destination_base: Path) -> Path:
    export_mime, ext = EXPORT_MAP.get(mime_type, ("application/pdf", ".pdf"))
    destination = destination_base.with_suffix(ext)
    destination.parent.mkdir(parents=True, exist_ok=True)
    params = {"fileId": file_id, "mimeType": export_mime}
    proc = run(["gws", "drive", "files", "export", "--params", json.dumps(params), "--output", str(destination)], capture=True)
    if proc.returncode != 0 and mime_type in FALLBACK_EXPORT_MAP:
        export_mime, ext = FALLBACK_EXPORT_MAP[mime_type]
        destination = destination_base.with_suffix(ext)
        params = {"fileId": file_id, "mimeType": export_mime}
        proc = run(["gws", "drive", "files", "export", "--params", json.dumps(params), "--output", str(destination)], capture=True)
    if proc.returncode != 0:
        raise RuntimeError(f"export failed for {file_id} ({mime_type}):\n{proc.stdout}\n{proc.stderr}")
    return destination


def existing_manifest(path: Path) -> Dict[str, Any]:
    if not path.exists():
        return {"files": {}}
    return json.loads(path.read_text(encoding="utf-8"))


def sync_folder(folder_id: str, out_dir: Path, manifest: Dict[str, Any], rel: Path = Path("")) -> List[Dict[str, Any]]:
    synced: List[Dict[str, Any]] = []
    for item in sorted(list_children(folder_id), key=lambda x: (x.get("mimeType") != GOOGLE_FOLDER_MIME, x.get("name", "").lower())):
        item_id = item["id"]
        name = safe_name(item.get("name", item_id))
        mime_type = item.get("mimeType", "")
        modified = item.get("modifiedTime", "")
        rel_path = rel / name
        if mime_type == GOOGLE_FOLDER_MIME:
            (out_dir / rel_path).mkdir(parents=True, exist_ok=True)
            synced.extend(sync_folder(item_id, out_dir, manifest, rel_path))
            continue

        manifest_key = item_id
        old = manifest.get("files", {}).get(manifest_key, {})
        if old.get("modifiedTime") == modified and old.get("localPath") and Path(old["localPath"]).exists():
            synced.append(old)
            continue

        base = out_dir / rel_path
        if mime_type.startswith("application/vnd.google-apps."):
            local_path = export_workspace_file(item_id, mime_type, base)
        else:
            local_path = base
            download_binary(item_id, local_path)

        record = {
            "id": item_id,
            "name": item.get("name"),
            "mimeType": mime_type,
            "modifiedTime": modified,
            "webViewLink": item.get("webViewLink"),
            "localPath": str(local_path),
            "relativePath": str(local_path.relative_to(out_dir)),
            "sha256": file_hash(local_path) if local_path.exists() else None,
            "size": local_path.stat().st_size if local_path.exists() else None,
        }
        manifest.setdefault("files", {})[manifest_key] = record
        synced.append(record)
        print(f"synced: {record['relativePath']}")
    return synced


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--folder-id", default="1tWu5Sjd6amqsTx6YXDIfB6-JeX3ZwDfA")
    parser.add_argument("--out", default="docs/google-drive-info")
    args = parser.parse_args()

    repo = Path.cwd()
    out_dir = (repo / args.out).resolve()
    out_dir.mkdir(parents=True, exist_ok=True)
    manifest_path = out_dir / "_manifest.json"
    manifest = existing_manifest(manifest_path)
    manifest["sourceFolderId"] = args.folder_id
    manifest["outputDirectory"] = str(out_dir)

    synced = sync_folder(args.folder_id, out_dir, manifest)
    manifest["syncedCount"] = len(synced)
    manifest_path.write_text(json.dumps(manifest, indent=2, sort_keys=True), encoding="utf-8")
    print(f"Synced {len(synced)} Drive files into {out_dir}")
    print(f"Manifest: {manifest_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
