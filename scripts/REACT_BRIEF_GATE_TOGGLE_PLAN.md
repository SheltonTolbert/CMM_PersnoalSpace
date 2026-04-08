# React Brief Gate Toggle Plan

## Problem
Current hard gates expect content markers directly in `index.html`. In React-entry mode, `index.html` is a redirect shell and content lives in `brief.json` + app renderer.

## Toggle strategy
Introduce `BRIEF_RENDER_MODE` with values:
- `legacy` (default): current HTML-content gates
- `react`: JSON + React-entry gates

## React mode gate set
1. Validate `brief.json` schema
2. Validate `brief-podcast.mp3` size/duration + date binding
3. Validate manifest binding
4. Validate React entry index:
   - contains meta refresh
   - routes to `?brief=/CMM_PersnoalSpace/daily-briefs/YYYY-MM-DD/brief.json`

## Rollout
1. Add toggle branch in `run_daily_brief_hard_gates.sh`
2. Enable `BRIEF_RENDER_MODE=react` for dry-run date first
3. Promote to default after two clean daily runs
