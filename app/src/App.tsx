import './App.css'

type Artifact = {
  slug: string
  title: string
  summary: string
  template: 'landing' | 'report' | 'timeline' | 'showcase' | 'one-pager'
  updated: string
}

const artifacts: Artifact[] = [
  {
    slug: 'launch-brief-v1',
    title: 'Launch Brief v1',
    summary: 'A concise one-pager for a product launch narrative and key metrics.',
    template: 'one-pager',
    updated: '2026-03-30'
  },
  {
    slug: 'project-timeline-sample',
    title: 'Project Timeline Sample',
    summary: 'Milestones and dependencies presented in a structured timeline layout.',
    template: 'timeline',
    updated: '2026-03-30'
  },
  {
    slug: 'artifact-showcase',
    title: 'Artifact Showcase',
    summary: 'Gallery-style page for demos, visuals, and experiments.',
    template: 'showcase',
    updated: '2026-03-30'
  }
]

const tokens = [
  ['--bg', '#0b1020'],
  ['--surface', '#121a31'],
  ['--surface-2', '#1a2544'],
  ['--text', '#eaf0ff'],
  ['--muted', '#aeb8db'],
  ['--accent', '#7db1ff'],
  ['--radius', '14px'],
  ['--space-4', '16px'],
  ['--space-6', '24px']
]

function App() {
  return (
    <main className="page-shell">
      <header className="hero section card">
        <p className="eyebrow">CMM Personal Space</p>
        <h1>Artifact Framework v1</h1>
        <p>
          A consistent UI system for publishing visual artifacts — no chat layer, just reusable
          structure, templates, and styling guardrails.
        </p>
      </header>

      <section className="section grid-2">
        <article className="card">
          <h2>Design tokens</h2>
          <ul className="token-list">
            {tokens.map(([name, value]) => (
              <li key={name}>
                <code>{name}</code>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h2>Core templates</h2>
          <ul className="plain-list">
            <li>Landing</li>
            <li>Report</li>
            <li>Timeline</li>
            <li>Showcase</li>
            <li>One-pager</li>
          </ul>
          <p className="muted">Use these to keep every artifact visually coherent.</p>
        </article>
      </section>

      <section className="section card">
        <div className="row-between">
          <h2>Artifact index</h2>
          <span className="badge">/artifacts/{'{slug}'}</span>
        </div>
        <div className="artifact-grid">
          {artifacts.map((a) => (
            <article key={a.slug} className="artifact-card">
              <h3>{a.title}</h3>
              <p>{a.summary}</p>
              <div className="row-between meta">
                <span>{a.template}</span>
                <span>{a.updated}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
