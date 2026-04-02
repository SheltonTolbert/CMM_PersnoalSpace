#!/usr/bin/env python3
from pathlib import Path
import argparse, json, re, sys, hashlib

REQ_SECTIONS = [
  'Weather', 'Top Local News', 'Top National News', 'Top Global News',
  'Top Tech News', 'Guitar', 'Coding', 'Quote', 'Briefcast'
]

ap = argparse.ArgumentParser()
ap.add_argument('--dir', required=True)
ap.add_argument('--min-audio-bytes', type=int, default=400000)
args = ap.parse_args()

base = Path(args.dir)
html = base / 'index.html'
mp3 = base / 'brief-podcast.mp3'
manifest = base / 'manifest.json'

if not html.exists():
    print('FAIL: missing index.html', file=sys.stderr); sys.exit(1)
if not mp3.exists():
    print('FAIL: missing brief-podcast.mp3', file=sys.stderr); sys.exit(1)
if mp3.stat().st_size < args.min_audio_bytes:
    print(f'FAIL: audio too small ({mp3.stat().st_size} bytes)', file=sys.stderr); sys.exit(1)

text = html.read_text(encoding='utf-8', errors='ignore')
for s in REQ_SECTIONS:
    if s not in text:
        print(f'FAIL: missing section marker {s}', file=sys.stderr); sys.exit(1)
if '<audio' not in text or 'brief-podcast.mp3' not in text:
    print('FAIL: missing audio embed/reference', file=sys.stderr); sys.exit(1)

if not manifest.exists():
    print('FAIL: missing manifest.json', file=sys.stderr); sys.exit(1)
obj = json.loads(manifest.read_text())
if obj.get('status') != 'ready':
    print('FAIL: manifest status != ready', file=sys.stderr); sys.exit(1)

# hash integrity
for fn in ['index.html','brief-podcast.mp3']:
    h = hashlib.sha256((base/fn).read_bytes()).hexdigest()
    if obj.get('sha256',{}).get(fn) != h:
        print(f'FAIL: hash mismatch for {fn}', file=sys.stderr); sys.exit(1)

print('OK: deterministic brief contract pass')
