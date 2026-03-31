#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <daily-brief-dir>" >&2
  exit 2
fi

dir="$1"
html="$dir/index.html"
mp3="$dir/brief-podcast.mp3"

[[ -f "$html" ]] || { echo "Missing HTML: $html" >&2; exit 1; }
[[ -f "$mp3" ]] || { echo "Missing audio file: $mp3" >&2; exit 1; }

if ! grep -q "brief-podcast.mp3" "$html"; then
  echo "HTML missing brief-podcast.mp3 reference" >&2
  exit 1
fi

if ! grep -qi "<audio" "$html"; then
  echo "HTML missing <audio> player" >&2
  exit 1
fi

echo "OK: audio file + HTML embed present for $dir"
