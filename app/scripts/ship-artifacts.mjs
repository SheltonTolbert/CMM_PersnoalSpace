import { execSync } from 'node:child_process'
import path from 'node:path'

const appRoot = path.resolve(process.cwd())
const repoRoot = path.resolve(appRoot, '..')
const stamp = new Date().toISOString().replace('T', ' ').replace('Z', ' UTC')

const run = (cmd, cwd = appRoot) => {
  console.log(`\n$ ${cmd}`)
  execSync(cmd, { cwd, stdio: 'inherit' })
}

run('npm run export:pages', appRoot)
run('git add app docs', repoRoot)

let committed = false
try {
  run(`git commit -m "ARTIFACTS: publish ${stamp}"`, repoRoot)
  committed = true
} catch (err) {
  const msg = String(err?.stderr || err?.message || err)
  if (msg.includes('nothing to commit') || msg.includes('no changes added to commit')) {
    console.log('\nNo changes to commit.')
    process.exit(0)
  }
  throw err
}

if (committed) {
  run('git push', repoRoot)
  console.log('\n✅ Artifact publish complete.')
}
