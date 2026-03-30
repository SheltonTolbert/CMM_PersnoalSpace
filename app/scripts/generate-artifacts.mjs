import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(process.cwd())
const artifactsDir = path.join(root, 'artifacts')
const outDir = path.join(root, 'public', 'artifacts')

fs.mkdirSync(outDir, { recursive: true })

const files = fs.readdirSync(artifactsDir).filter((f) => f.endsWith('.json'))
const items = files.map((file) => {
  const raw = fs.readFileSync(path.join(artifactsDir, file), 'utf8')
  return JSON.parse(raw)
})

const esc = (s = '') =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

function renderSections(sections = []) {
  return sections
    .map((section) => {
      const heading = `<h2>${esc(section.heading || '')}</h2>`
      const body = section.body ? `<p>${esc(section.body)}</p>` : ''
      const bullets = Array.isArray(section.bullets)
        ? `<ul>${section.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`
        : ''
      return `<section class="card">${heading}${body}${bullets}</section>`
    })
    .join('\n')
}

function renderArtifactPage(item) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(item.title)} · CMM Personal Space</title>
  <style>
    :root { --bg:#0b1020; --surface:#131c36; --text:#eaf0ff; --muted:#aeb8db; --accent:#7db1ff; }
    * { box-sizing: border-box; }
    body { margin:0; font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif; background:linear-gradient(180deg,#0a0f1c,#0a1122); color:var(--text); }
    .wrap { max-width: 900px; margin:0 auto; padding: 32px 16px 56px; }
    .card { background:var(--surface); border:1px solid #283a6a; border-radius:14px; padding:20px; margin-bottom:16px; }
    .eyebrow { color:var(--accent); text-transform:uppercase; font-size:12px; letter-spacing:.08em; font-weight:700; margin:0 0 6px; }
    h1 { margin:0 0 8px; }
    h2 { margin:0 0 8px; font-size:1.1rem; }
    p, li { color:var(--muted); line-height:1.55; }
    .meta { display:flex; gap:10px; flex-wrap:wrap; font-size:12px; color:#9fb2df; }
    a { color: var(--accent); text-decoration:none; }
    a:hover { text-decoration:underline; }
  </style>
</head>
<body>
  <main class="wrap">
    <header class="card">
      <p class="eyebrow">${esc(item.template || 'artifact')}</p>
      <h1>${esc(item.title)}</h1>
      <p>${esc(item.summary || '')}</p>
      <div class="meta">
        <span>Updated: ${esc(item.updated || '')}</span>
        <span>Author: ${esc(item.author || 'Chad Michael Michaels')}</span>
      </div>
      <p><a href="/CMM_PersnoalSpace/">← Back to framework index</a></p>
    </header>
    ${renderSections(item.sections)}
  </main>
</body>
</html>`
}

for (const item of items) {
  const dir = path.join(outDir, item.slug)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), renderArtifactPage(item), 'utf8')
}

fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(items, null, 2), 'utf8')
console.log(`Generated ${items.length} artifact page(s).`)
