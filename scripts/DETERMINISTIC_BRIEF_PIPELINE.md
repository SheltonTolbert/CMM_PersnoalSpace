# Deterministic Daily Brief Pipeline

## Contract
A brief is publishable only when stage dir contains:
- `index.html`
- `brief-podcast.mp3`
- `manifest.json` with `status: ready` and SHA256 hashes for both files

Required content markers in `index.html`:
- Weather / Local / National / Global / Tech
- Guitar / Coding / Quote / Briefcast
- `<audio>` player + `brief-podcast.mp3` reference

## Flow
1. Generate into staging: `tmp/daily-briefs/YYYY-MM-DD/`
2. Produce `manifest.json` after generation
3. Run validator:
   - `scripts/validate_daily_brief_contract.py --dir <stage>`
4. Promote only on pass:
   - `scripts/deterministic_publish_daily_brief.sh YYYY-MM-DD`
5. Then commit + push

## Failure behavior
- Any failed gate => no publish, no announcement.
- Keep last known-good published brief intact.
