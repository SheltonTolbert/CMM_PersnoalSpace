#!/usr/bin/env bash
set -euo pipefail
# deterministic publish: stage -> validate -> atomically promote
# Usage: deterministic_publish_daily_brief.sh YYYY-MM-DD

DATE="${1:-}"
if [[ -z "$DATE" ]]; then
  echo "Usage: $0 YYYY-MM-DD" >&2
  exit 2
fi

ROOT="/home/shell/.openclaw/workspace/CMM_PersnoalSpace"
STAGE="$ROOT/tmp/daily-briefs/$DATE"
PUB1="$ROOT/daily-briefs/$DATE"
PUB2="$ROOT/docs/daily-briefs/$DATE"

[[ -d "$STAGE" ]] || { echo "Missing stage dir: $STAGE" >&2; exit 1; }
python3 "$ROOT/scripts/validate_daily_brief_contract.py" --dir "$STAGE"

mkdir -p "$(dirname "$PUB1")" "$(dirname "$PUB2")"
rm -rf "$PUB1" "$PUB2"
cp -R "$STAGE" "$PUB1"
cp -R "$STAGE" "$PUB2"

echo "Published deterministic brief for $DATE"
