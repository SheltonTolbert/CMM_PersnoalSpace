#!/usr/bin/env python3
import argparse
import hashlib
import json
import pathlib
import sys


def sha256_file(path: pathlib.Path) -> str:
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()


def main():
    p = argparse.ArgumentParser(description='Refresh staged daily-brief manifest hashes')
    p.add_argument('--dir', required=True, help='Stage directory')
    args = p.parse_args()

    d = pathlib.Path(args.dir)
    manifest = d / 'manifest.json'
    index = d / 'index.html'
    audio = d / 'brief-podcast.mp3'

    if not manifest.exists() or not index.exists() or not audio.exists():
        print('FAIL: missing manifest/index/audio in stage dir', file=sys.stderr)
        sys.exit(1)

    obj = json.loads(manifest.read_text())
    obj.setdefault('status', 'ready')
    obj['sha256'] = {
        'index.html': sha256_file(index),
        'brief-podcast.mp3': sha256_file(audio),
    }

    manifest.write_text(json.dumps(obj, indent=2) + '\n')
    print(f'OK: refreshed manifest hashes for {d}')


if __name__ == '__main__':
    main()
