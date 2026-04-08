#!/usr/bin/env python3
import argparse
import pathlib
import re
import sys


def fail(msg: str):
    print(f"FAIL: {msg}", file=sys.stderr)
    sys.exit(1)


def main():
    p = argparse.ArgumentParser(description="Validate React-entry daily brief index")
    p.add_argument("--dir", required=True, help="Daily brief directory")
    p.add_argument("--date", required=True, help="YYYY-MM-DD")
    args = p.parse_args()

    d = pathlib.Path(args.dir)
    html = d / "index.html"
    brief = d / "brief.json"

    if not html.exists():
        fail("missing index.html")
    if not brief.exists():
        fail("missing brief.json")

    text = html.read_text(encoding="utf-8", errors="ignore")
    if "http-equiv=\"refresh\"" not in text:
        fail("missing meta refresh")

    expected = f"?brief=/CMM_PersnoalSpace/daily-briefs/{args.date}/brief.json"
    if expected not in text:
        fail(f"missing expected brief route: {expected}")

    if "Daily Brief" not in text:
        fail("missing title marker")

    print("OK: React brief entry validation passed")


if __name__ == "__main__":
    main()
