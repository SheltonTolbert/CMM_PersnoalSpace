#!/usr/bin/env python3
import argparse
import json
import pathlib
import sys

REQUIRED_TOP = [
    'date', 'location', 'weather', 'sections', 'guitarExercise', 'codingPrompt', 'quote', 'audio'
]
REQUIRED_SECTIONS = ['local', 'national', 'global', 'tech']


def fail(msg: str):
    print(f'FAIL: {msg}', file=sys.stderr)
    sys.exit(1)


def main():
    p = argparse.ArgumentParser(description='Validate daily brief JSON payload shape')
    p.add_argument('--file', required=True, help='Path to brief.json')
    args = p.parse_args()

    fp = pathlib.Path(args.file)
    if not fp.exists():
      fail(f'missing file: {fp}')

    try:
      data = json.loads(fp.read_text())
    except Exception as e:
      fail(f'invalid JSON ({e})')

    for k in REQUIRED_TOP:
      if k not in data:
        fail(f'missing top-level key: {k}')

    if not isinstance(data['sections'], dict):
      fail('sections must be object')

    for sec in REQUIRED_SECTIONS:
      items = data['sections'].get(sec)
      if not isinstance(items, list) or len(items) < 3:
        fail(f'sections.{sec} must be an array with >=3 stories')
      for i, story in enumerate(items):
        if not all(k in story for k in ('title', 'url', 'source')):
          fail(f'sections.{sec}[{i}] missing title/url/source')

    if data.get('audio', {}).get('src') != './brief-podcast.mp3':
      fail('audio.src must equal ./brief-podcast.mp3')

    print('OK: brief.json schema validation passed')


if __name__ == '__main__':
    main()
