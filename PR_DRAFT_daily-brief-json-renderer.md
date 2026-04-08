## Summary
Migrate Daily Brief delivery toward a JSON-driven React rendering path to improve reliability (CSS/audio stability) and reduce brittle per-day handcrafted HTML.

## What changed
- Added Daily Brief JSON schema (`app/src/brief/brief-schema-v1.json`)
- Added React Daily Brief renderer + loader (`app/src/brief/DailyBrief.tsx`)
- Wired app route to load briefs via query param (`?brief=...`) in `app/src/App.tsx`
- Added React-entry stage tooling:
  - `scripts/render_react_brief_entry.py`
  - `scripts/prepare_react_brief_stage.sh`
  - `scripts/validate_react_brief_entry.py`
- Added rollout plan doc:
  - `scripts/REACT_BRIEF_GATE_TOGGLE_PLAN.md`
  - `DAILY_BRIEF_JSON_MIGRATION_PR_PLAN.md`

## Validation done
- `npm run build` passes in `app/`
- React-entry validator passes on staged brief for `2026-04-08`
- React-mode hard-gate flow passes after manifest refresh step (tracked in automation-side handoff)

## Notes / Follow-ups
- Automation-side gate/pipeline changes are tracked separately in workspace handoff (`automation/brief/JSON_MIGRATION_HANDOFF.md`) due to repo boundary.
- Merge order should follow the migration plan doc.
