#!/usr/bin/env python3
import argparse
import html
import json
import pathlib

TEMPLATE = """<!doctype html>
<html lang=\"en\">
<head>
  <meta charset=\"utf-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
  <title>Daily Brief - {date}</title>
  <meta http-equiv=\"refresh\" content=\"0; url={app_url}\" />
  <style>
    :root {{ color-scheme: dark; }}
    body {{ margin: 0; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background: #0b1020; color: #eaf0ff; }}
    main {{ min-height: 100vh; display: grid; place-items: center; padding: 24px; }}
    .card {{ background: #121a31; border: 1px solid #28375f; border-radius: 14px; max-width: 680px; width: 100%; padding: 20px; }}
    h1 {{ margin: 0 0 10px; font-size: 1.25rem; }}
    p {{ margin: 8px 0; color: #c8d6ff; }}
    a {{ color: #9cc1ff; }}
  </style>
  <script>window.location.replace({app_url_json});</script>
</head>
<body>
  <main>
    <section class=\"card\">
      <h1>Opening today\'s Daily Brief…</h1>
      <p>You\'ll be redirected automatically.</p>
      <p>If needed, <a href=\"{app_url}\">open the brief manually</a>.</p>
    </section>
  </main>
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
    out.write_text(
        TEMPLATE.format(
            date=html.escape(args.date),
            app_url=html.escape(app_url),
            app_url_json=json.dumps(app_url),
        ),
        encoding='utf-8',
    )
    print(f'Wrote {out}')


if __name__ == '__main__':
    main()
