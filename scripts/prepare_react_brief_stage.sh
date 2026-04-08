#!/usr/bin/env bash
set -euo pipefail

DATE="${1:-}"
if [[ -z "$DATE" ]]; then
  echo "Usage: $0 YYYY-MM-DD" >&2
  exit 2
fi

ROOT="/home/shell/.openclaw/workspace/CMM_PersnoalSpace"
STAGE="$ROOT/tmp/daily-briefs/$DATE"

if [[ ! -d "$STAGE" ]]; then
  echo "Missing stage dir: $STAGE" >&2
  exit 1
fi

if [[ -f "$STAGE/index.html" && ! -f "$STAGE/index.legacy.html" ]]; then
  cp "$STAGE/index.html" "$STAGE/index.legacy.html"
fi

python3 "$ROOT/scripts/render_react_brief_entry.py" --date "$DATE" --stage-dir "$STAGE"

echo "Prepared React-entry stage index for $DATE"
