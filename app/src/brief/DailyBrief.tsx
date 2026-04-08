import { useEffect, useState } from 'react'

export type BriefStory = {
  title: string
  url: string
  source: string
}

export type DailyBrief = {
  date: string
  location: string
  weather: string
  sections: {
    local: BriefStory[]
    national: BriefStory[]
    global: BriefStory[]
    tech: BriefStory[]
  }
  guitarExercise: string
  codingPrompt: string
  quote: {
    text: string
    author: string
  }
  audio: {
    src: string
    maxMinutes: number
  }
}

function StoryList({ stories }: { stories: BriefStory[] }) {
  return (
    <ul>
      {stories.map((story) => (
        <li key={`${story.url}-${story.title}`}>
          <a href={story.url} target="_blank" rel="noreferrer noopener">
            {story.title}
          </a>{' '}
          <span>({story.source})</span>
        </li>
      ))}
    </ul>
  )
}

export function DailyBriefView({ brief }: { brief: DailyBrief }) {
  return (
    <main className="page-shell">
      <header className="hero section card">
        <p className="eyebrow">Daily Brief</p>
        <h1>{brief.date} · {brief.location}</h1>
      </header>

      <section className="section card">
        <h2>Briefcast</h2>
        <audio controls preload="metadata">
          <source src={brief.audio.src} type="audio/mpeg" />
        </audio>
      </section>

      <section className="section card"><h2>Weather</h2><p>{brief.weather}</p></section>
      <section className="section card"><h2>Top Local News</h2><StoryList stories={brief.sections.local} /></section>
      <section className="section card"><h2>Top National News</h2><StoryList stories={brief.sections.national} /></section>
      <section className="section card"><h2>Top Global News</h2><StoryList stories={brief.sections.global} /></section>
      <section className="section card"><h2>Top Tech News</h2><StoryList stories={brief.sections.tech} /></section>
      <section className="section card"><h2>Guitar</h2><p>{brief.guitarExercise}</p></section>
      <section className="section card"><h2>Coding</h2><p>{brief.codingPrompt}</p></section>
      <section className="section card"><h2>Quote</h2><blockquote>“{brief.quote.text}” — {brief.quote.author}</blockquote></section>
    </main>
  )
}

export function DailyBriefLoader({ path }: { path: string }) {
  const [brief, setBrief] = useState<DailyBrief | null>(null)

  useEffect(() => {
    fetch(path)
      .then((r) => r.json())
      .then((data) => {
        const typed = data as DailyBrief
        const base = new URL(path, window.location.href)
        const resolvedAudio = new URL(typed.audio.src, base).toString()
        setBrief({ ...typed, audio: { ...typed.audio, src: resolvedAudio } })
      })
      .catch(() => setBrief(null))
  }, [path])

  if (!brief) {
    return (
      <main className="page-shell">
        <section className="section card">
          <h2>Daily Brief</h2>
          <p>Unable to load brief payload.</p>
        </section>
      </main>
    )
  }

  return <DailyBriefView brief={brief} />
}
