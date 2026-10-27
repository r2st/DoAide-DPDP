import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { blogPosts } from '../pages/blogData'
import { jsonLdFor, metaForPath, routes } from '../routeMeta'

const appSrc = readFileSync(resolve(process.cwd(), 'src/App.jsx'), 'utf-8')

describe('routeMeta', () => {
  it('has unique paths, titles and descriptions', () => {
    for (const key of ['path', 'title', 'description']) {
      const values = routes.map((r) => r[key])
      expect(new Set(values).size).toBe(values.length)
    }
  })

  it('matches the router', () => {
    const served = new Set([...appSrc.matchAll(/<Route path="([^"]+)"/g)].map((m) => m[1]))
    for (const r of routes) expect(served.has(r.path) || r.path.startsWith('/blog/'), r.path).toBe(true)
  })

  it('dates every post and emits complete FAQs', () => {
    for (const p of blogPosts) {
      const graph = jsonLdFor(metaForPath(`/blog/${p.slug}`))['@graph']
      expect(graph[0].datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      for (const q of graph.find((n) => n['@type'] === 'FAQPage')?.mainEntity ?? []) {
        expect(q.name && q.acceptedAnswer.text).toBeTruthy()
      }
    }
  })

  it('mirrors the runtime Helmet title on every tool page', () => {
    for (const r of routes.filter((x) => x.kind === 'tool')) {
      const file = readFileSync(resolve(process.cwd(), 'src/pages', `${pageFile(r.path)}.jsx`), 'utf-8')
      expect(file.includes(r.title) || file.includes(r.title.replace(' — DoAide DPDP', '')), r.path).toBe(true)
    }
  })
})

function pageFile(path) {
  const m = appSrc.match(new RegExp(`<Route path="${path}" element=\\{<(\\w+) />\\}`))
  return m[1]
}
