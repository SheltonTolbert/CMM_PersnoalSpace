# Daily Brief JSON Migration — PR Plan

## Goal
Ship JSON-driven React rendering for daily briefs with reliable CSS/audio and schema-validated payloads.

## PR-1 (CMM_PersnoalSpace)
Includes files in this repo:
- `app/src/brief/brief-schema-v1.json`
- `app/src/brief/DailyBrief.tsx`
- `app/src/App.tsx`

Intent:
- Add stable React renderer for brief payloads.
- Enable `?brief=<path-to-brief.json>` loading pattern.
- Resolve audio URL from the brief JSON location.

## PR-2 (workspace automation repo)
Includes files outside this repo:
- `automation/brief/build_brief_json.py`
- `automation/brief/validate_brief_json_schema.py`
- `automation/brief/run_daily_brief_hard_gates.sh`

Intent:
- Generate `brief.json` payload in staged brief folder.
- Validate payload contract as hard gate.
- Keep existing audio/date/manifest gates.

## Dry-run validation checklist (before merge)
1. Generate staged brief artifacts for target date.
2. Ensure staged dir has: `index.html`, `brief-podcast.mp3`, `manifest.json`, `brief.json`.
3. Run hard gates:
   - `automation/brief/run_daily_brief_hard_gates.sh <stage-dir>`
4. Confirm published page has CSS + playable `<audio>`.

## Merge order
1. Merge PR-1 (renderer path available)
2. Merge PR-2 (automation emits/validates JSON)
3. Run next scheduled daily brief and verify end-to-end publish
