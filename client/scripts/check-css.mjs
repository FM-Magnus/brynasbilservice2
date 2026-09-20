#!/usr/bin/env node
/**
 * Guards the canonical CSS layer. Run with `npm --prefix client run check:css`;
 * the pre-commit hook runs it too.
 *
 * Two things are enforced, both of which have already gone wrong in this
 * repository:
 *
 * 1. Every `var(--bb-*)` reference resolves. An unresolved custom property
 *    with no fallback does not raise an error — it makes the whole declaration
 *    invalid at computed-value time, so the rule silently disappears. That is
 *    how seven card borders stopped rendering on ten guide pages without
 *    anyone noticing.
 * 2. The deleted legacy layer stays deleted. `client/src/css/index.css` was
 *    removed on 2026-09-19 and the `--redesign-*` token family with it, but
 *    several documents still describe them, so a new file can reintroduce them
 *    by following stale instructions.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src')

/**
 * Tokens that are referenced but not yet defined, each pending a decision by
 * Magnus about whether the intended treatment should appear (defining them
 * changes approved appearance on 14 pages).
 *
 * This list may only shrink. Do not add to it: if a new reference needs a new
 * token, define the token in styles/design-tokens.css instead.
 */
const PENDING_TOKENS = new Set([
  '--bb-color-border-subtle',
  '--bb-shadow-elevated',
  '--bb-radius-lg',
  '--bb-radius-pill',
  '--bb-font-sans',
])

const FORBIDDEN = [
  { pattern: /--redesign-[\w-]+/g, label: 'legacy --redesign-* token (the index.css token family was deleted 2026-09-19)' },
  { pattern: /css\/index\.css/g, label: 'reference to the deleted legacy stylesheet client/src/css/index.css' },
]

function walk(dir, ext, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, ext, out)
    else if (ext.some((e) => entry.name.endsWith(e))) out.push(full)
  }
  return out
}

const cssFiles = walk(SRC, ['.css'])
const sourceFiles = walk(SRC, ['.css', '.ts', '.tsx'])
const rel = (f) => path.relative(path.join(SRC, '..'), f)

// Strip comments so a token name that is merely *described* in prose is not
// mistaken for a real reference. Block comments apply to both CSS and TS; line
// comments only to TS/TSX, and only when `//` is not part of a URL.
const stripBlock = (text) => text.replace(/\/\*[\s\S]*?\*\//g, '')
const stripLine = (text) => text.replace(/(^|[^:])\/\/.*$/gm, '$1')
const readStripped = (file) => {
  const text = stripBlock(fs.readFileSync(file, 'utf8'))
  return file.endsWith('.css') ? text : stripLine(text)
}

const defined = new Set()
for (const file of cssFiles) {
  for (const m of readStripped(file).matchAll(/(--[\w-]+)\s*:/g)) {
    defined.add(m[1])
  }
}

const problems = []

// 1. unresolved custom properties
for (const file of cssFiles) {
  readStripped(file).split('\n').forEach((line, i) => {
    for (const m of line.matchAll(/var\(\s*(--[\w-]+)\s*(,)?/g)) {
      const [, name, hasFallback] = m
      if (defined.has(name) || hasFallback) continue
      if (PENDING_TOKENS.has(name)) continue
      problems.push(`${rel(file)}:${i + 1}  var(${name}) is never defined and has no fallback — the whole declaration will be dropped`)
    }
  })
}

// 2. legacy layer must stay deleted
for (const file of sourceFiles) {
  readStripped(file).split('\n').forEach((line, i) => {
    for (const { pattern, label } of FORBIDDEN) {
      for (const m of line.matchAll(pattern)) {
        problems.push(`${rel(file)}:${i + 1}  ${label}: ${m[0]}`)
      }
    }
  })
}

const stillPending = [...PENDING_TOKENS].filter((t) =>
  cssFiles.some((f) => readStripped(f).includes(`var(${t})`)))

if (problems.length) {
  console.error(`\ncheck-css: ${problems.length} problem(s)\n`)
  for (const p of problems) console.error('  ' + p)
  console.error('')
  process.exit(1)
}

console.log(`check-css: ${defined.size} tokens defined, ${cssFiles.length} stylesheets clean.`)
if (stillPending.length) {
  console.log(`check-css: ${stillPending.length} token(s) still on the pending list (awaiting a decision, not a regression):`)
  for (const t of stillPending) console.log('  ' + t)
}
