#!/usr/bin/env bash
set -euo pipefail

DATE="2026-04-09"
WS="/home/shell/.openclaw/workspace"
ROOT="$WS/CMM_PersnoalSpace"
STAGE="$ROOT/tmp/daily-briefs/$DATE"

# 1) Ensure stage exists from generator output
[[ -d "$STAGE" ]] || { echo "Missing stage: $STAGE" >&2; exit 1; }

# 2) Prepare react-entry index
"$ROOT/scripts/prepare_react_brief_stage.sh" "$DATE"

# 3) Refresh manifest after index rewrite
python3 "$WS/automation/brief/refresh_stage_manifest.py" --dir "$STAGE"

# 4) Run hard gates in react mode
BRIEF_RENDER_MODE=react bash "$WS/automation/brief/run_daily_brief_hard_gates.sh" "$STAGE"

echo "Dry-run pass for $DATE"
