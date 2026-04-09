#!/usr/bin/env bash
set -euo pipefail
if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <daily-brief-dir>" >&2
  exit 2
fi
DIR="$1"
WS="/home/shell/.openclaw/workspace"
HTML="$DIR/index.html"
SCHEMA="$WS/subagents/frontend-engineer/packets/WEB-001-daily-brief-schema-gate/brief-schema-v1.json"
PACKET="$WS/automation/brief/reporter_packet.json"
MODE="${BRIEF_RENDER_MODE:-legacy}"
DATE="$(basename "$DIR")"

python3 "$WS/automation/brief/validate_news_freshness.py" --packet "$PACKET"

if [[ "$MODE" == "react" ]]; then
  python3 "$WS/automation/brief/validate_brief_json_schema.py" --file "$DIR/brief.json"
  python3 "$WS/CMM_PersnoalSpace/scripts/validate_react_brief_entry.py" --dir "$DIR" --date "$DATE"
else
  python3 "$WS/automation/brief/validate_daily_brief_schema.py" --html "$HTML" --schema "$SCHEMA" --dir "$DIR"
  python3 "$WS/automation/brief/validate_story_quality.py" --html "$HTML" --min-links 3
  if [[ -f "$DIR/brief.json" ]]; then
    python3 "$WS/automation/brief/validate_brief_json_schema.py" --file "$DIR/brief.json"
  fi
fi

if [[ "$MODE" == "react" ]]; then
  [[ -f "$DIR/brief-podcast.mp3" ]] || { echo "FAIL: missing brief-podcast.mp3" >&2; exit 1; }
else
  "$WS/CMM_PersnoalSpace/scripts/validate_daily_brief_audio.sh" "$DIR"
fi
python3 "$WS/automation/brief/audio_guard.py" --audio "$DIR/brief-podcast.mp3" --min-seconds 120 --min-bytes 400000
python3 "$WS/automation/brief/validate_audio_date_binding.py" --dir "$DIR"
python3 "$WS/automation/brief/validate_manifest_binding.py" --dir "$DIR"

echo "OK: all hard gates passed for $DIR (mode=$MODE)"
