import { CopilotKit } from '@copilotkit/react-core'
import { CopilotSidebar } from '@copilotkit/react-ui'
import '@copilotkit/react-ui/styles.css'
import './App.css'

const RUNTIME_URL = 'https://your-copilot-runtime.example.com/api/copilotkit'

function App() {
  return (
    <CopilotKit runtimeUrl={RUNTIME_URL}>
      <main className="layout">
        <section className="hero card">
          <h1>CMM Personal Space 🛠️</h1>
          <p>
            Modular Agent UI powered by <strong>CopilotKit</strong>. This space is where Chad can
            publish interactive artifacts and visual outputs.
          </p>
          <p className="hint">
            Next step: connect a Copilot runtime endpoint at <code>{RUNTIME_URL}</code>.
          </p>
        </section>

        <section className="grid">
          <article className="card">
            <h2>Artifact Studio</h2>
            <p>Generate pages, demos, and visuals for ideas and experiments.</p>
          </article>
          <article className="card">
            <h2>Agent Console</h2>
            <p>Use the right sidebar to chat with the agent and orchestrate UI actions.</p>
          </article>
          <article className="card">
            <h2>Project Mode</h2>
            <p>Iterate quickly: draft, preview, publish to GitHub Pages.</p>
          </article>
        </section>
      </main>

      <CopilotSidebar
        defaultOpen
        labels={{
          title: 'Chad • Agent Console',
          initial: 'Hey Shelton — what should we build next?'
        }}
        instructions={
          'You are Chad Michael Michaels. Help create and iterate visual artifacts, UIs, and demos for Shelton.'
        }
      />
    </CopilotKit>
  )
}

export default App
