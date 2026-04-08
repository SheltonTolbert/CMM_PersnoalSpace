import { useEffect, useState } from 'react'
import './App.css'
import { DailyBriefLoader } from './brief/DailyBrief'

type Artifact = {
  slug: string
  title: string
  summary: string
  template: 'landing' | 'report' | 'timeline' | 'showcase' | 'one-pager'
  updated: string
}

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
  const [artifacts, setArtifacts] = useState<Artifact[]>([])
  const params = new URLSearchParams(window.location.search)
  const briefPath = params.get('brief')

  useEffect(() => {
    fetch('./artifacts/index.json')
      .then((r) => r.json())
      .then((data) => setArtifacts(Array.isArray(data) ? data : []))
      .catch(() => setArtifacts([]))
  }, [])

  if (briefPath) {
    return <DailyBriefLoader path={briefPath} />
  }

  return (
    <main className="page-shell">
      <header className="hero section card">
        <p className="eyebrow">CMM Personal Space</p>
        <h1>Artifact Framework v1</h1>
        <p>
          A consistent UI system for publishing visual artifacts — reusable structure, templates,
          and style guardrails.
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
          <p className="muted">Generate from JSON, publish to /artifacts/{'{slug}'}/.</p>
        </article>
      </section>

      <section className="section card">
        <div className="row-between">
          <h2>Artifact index</h2>
          <span className="badge">/artifacts/{'{slug}'}/</span>
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
              <a className="artifact-link" href={`./artifacts/${a.slug}/`}>
                Open artifact →
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
