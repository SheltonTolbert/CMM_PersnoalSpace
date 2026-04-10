# Daily Brief Automation Status (Canonical Path)

Canonical development path: `CMM_PersnoalSpace/automation/brief/`

Contains:
- `build_brief_json.py`
- `validate_brief_json_schema.py`
- `refresh_stage_manifest.py`
- `run_daily_brief_hard_gates.sh`

Current policy:
- Default gate mode remains `legacy` for rollback safety.
- `react` mode is available via `BRIEF_RENDER_MODE=react`.

Validation target:
- Both `legacy` and `react` hard-gate passes on staged brief artifacts.

Runtime rule:
- Prefer invoking scripts from `CMM_PersnoalSpace/automation/brief/`.
- Legacy `workspace/automation/brief/` copies are treated as mirror-only during transition and must remain byte-identical.
