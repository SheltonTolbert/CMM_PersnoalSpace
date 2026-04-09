#!/usr/bin/env python3
import argparse
import json
import pathlib


def extract_source(title: str) -> str:
    if ' - ' in title:
        return title.rsplit(' - ', 1)[-1].strip()
    return 'Unknown'


def map_stories(items):
    out = []
    for item in items[:3]:
        title = item.get('title', '').strip()
        out.append({
            'title': title,
            'url': item.get('url', '').strip(),
            'source': extract_source(title),
        })
    return out


def main():
    p = argparse.ArgumentParser(description='Build Daily Brief brief.json payload from reporter packet + authored fields')
    p.add_argument('--date', required=True)
    p.add_argument('--location', default='Reno, NV')
    p.add_argument('--reporter-packet', required=True)
    p.add_argument('--weather', required=True)
    p.add_argument('--guitar', required=True)
    p.add_argument('--coding', required=True)
    p.add_argument('--quote-text', required=True)
    p.add_argument('--quote-author', required=True)
    p.add_argument('--output', required=True)
    args = p.parse_args()

    packet = json.loads(pathlib.Path(args.reporter_packet).read_text())
    tiers = packet.get('tiers', {})

    payload = {
        'date': args.date,
        'location': args.location,
        'weather': args.weather,
        'sections': {
            'local': map_stories(tiers.get('local', [])),
            'national': map_stories(tiers.get('national', [])),
            'global': map_stories(tiers.get('global', [])),
            'tech': map_stories(tiers.get('tech', [])),
        },
        'guitarExercise': args.guitar,
        'codingPrompt': args.coding,
        'quote': {
            'text': args.quote_text,
            'author': args.quote_author,
        },
        'audio': {
            'src': './brief-podcast.mp3',
            'maxMinutes': 6,
        },
    }

    out = pathlib.Path(args.output)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(payload, indent=2) + '\n')
    print(f'Wrote {out}')


if __name__ == '__main__':
    main()
