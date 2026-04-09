## Summary
Track automation-side daily brief JSON/react migration scripts in-repo and add dual-mode hard-gate support.

## Changes
- add `automation/brief/build_brief_json.py`
- add `automation/brief/validate_brief_json_schema.py`
- add `automation/brief/refresh_stage_manifest.py`
- add `automation/brief/run_daily_brief_hard_gates.sh` with `BRIEF_RENDER_MODE` toggle
- add `automation/brief/STATUS.md`

## Rollback safety
- Default mode remains `legacy`.
- `react` mode is opt-in via env var (`BRIEF_RENDER_MODE=react`).

## Validation evidence
- `legacy` mode hard gates passed on staged `2026-04-09`.
- `react` mode hard gates passed on staged `2026-04-09` after stage prep + manifest refresh.
