import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(process.cwd())
const artifactsDir = path.join(root, 'artifacts')

const args = process.argv.slice(2)
const getArg = (name, fallback = '') => {
  const idx = args.indexOf(`--${name}`)
  return idx >= 0 ? (args[idx + 1] || fallback) : fallback
}

const slug = getArg('slug')
const template = getArg('template', 'report')
const title = getArg('title', slug ? slug.replaceAll('-', ' ') : 'New Artifact')
const summary = getArg('summary', 'Artifact summary goes here.')

if (!slug) {
  console.error('Usage: npm run new:artifact -- --slug <slug> [--template report] [--title "..."] [--summary "..."]')
  process.exit(1)
}

if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error('Slug must be lowercase letters, numbers, and dashes only.')
  process.exit(1)
}

const outPath = path.join(artifactsDir, `${slug}.json`)
if (fs.existsSync(outPath)) {
  console.error(`Artifact already exists: ${outPath}`)
  process.exit(1)
}

const today = new Date().toISOString().slice(0, 10)

const starter = {
  slug,
  title,
  summary,
  template,
  updated: today,
  author: 'Chad Michael Michaels',
  sections: [
    {
      heading: 'Outcome',
      body: 'Summarize the artifact outcome here.'
    },
    {
      heading: 'Details',
      bullets: ['Key point 1', 'Key point 2', 'Key point 3']
    },
    {
      heading: 'Next actions',
      body: 'Describe follow-up actions.'
    }
  ]
}

fs.mkdirSync(artifactsDir, { recursive: true })
fs.writeFileSync(outPath, JSON.stringify(starter, null, 2) + '\n', 'utf8')

console.log(`Created artifact scaffold: ${path.relative(root, outPath)}`)
console.log(`Next: edit it, then run npm run export:pages`)
