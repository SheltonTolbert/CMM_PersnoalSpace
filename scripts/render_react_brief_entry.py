#!/usr/bin/env python3
import argparse
import html
import pathlib

TEMPLATE = """<!doctype html>
<html lang=\"en\">
<head>
  <meta charset=\"utf-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
  <title>Daily Brief - {date}</title>
  <meta http-equiv=\"refresh\" content=\"0; url={app_url}\" />
</head>
<body>
  <p>Redirecting to the Daily Brief renderer…</p>
  <p>If it does not open automatically, <a href=\"{app_url}\">open today\'s brief</a>.</p>
</body>
</html>
"""


def main():
    p = argparse.ArgumentParser(description='Write a React-entry index.html for a staged brief directory')
    p.add_argument('--date', required=True)
    p.add_argument('--stage-dir', required=True)
    p.add_argument('--app-base', default='/CMM_PersnoalSpace/')
    args = p.parse_args()

    stage = pathlib.Path(args.stage_dir)
    stage.mkdir(parents=True, exist_ok=True)

    app_url = f"{args.app_base}?brief=/CMM_PersnoalSpace/daily-briefs/{args.date}/brief.json"
    out = stage / 'index.html'
    out.write_text(TEMPLATE.format(date=html.escape(args.date), app_url=html.escape(app_url)), encoding='utf-8')
    print(f'Wrote {out}')


if __name__ == '__main__':
    main()
