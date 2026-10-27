/**
 * SEO metadata for every indexable route, read by scripts/prerender-routes.mjs
 * to write per-route HTML, sitemap.xml and serve.json. Pages still set their
 * own <title>/description at runtime through react-helmet-async; the titles
 * and descriptions here mirror those, so the HTML a crawler receives matches
 * what the page shows after it loads. Plain JS only: no JSX or browser APIs.
 */

import { blogPosts } from './pages/blogData.js'

export const SITE = {
  name: 'DoAide DPDP',
  baseUrl: 'https://dpdp.doaide.com',
  ogImage: 'https://dpdp.doaide.com/og-dpdp.png',
}

const ORG = { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' }

const page = (kind, path, h1, title, description) => ({ kind, path, h1, title: `${title} — DoAide DPDP`, description })

export const routes = [
  {
    kind: 'home',
    path: '/',
    h1: 'Is Your Business DPDP Ready?',
    title: "DoAide | DPDP — India's DPDP Act Compliance Toolkit",
    description:
      'Free tools to help Indian businesses comply with the Digital Personal Data Protection Act 2023. Check your compliance score, generate privacy policies, and more.',
  },
  page('page', '/tools', 'Free DPDP Compliance Tools', 'Free DPDP Compliance Tools',
    '10 free tools for DPDP Act compliance: readiness assessment, compliance score, privacy policy generator, consent builder, DPA generator, DSR handler, breach checklist, and more.'),
  page('tool', '/tools/compliance-score', 'DPDP Compliance Score Calculator', 'DPDP Compliance Score Calculator',
    'Answer 20 questions to get your instant DPDP compliance score. Free assessment covering consent, data rights, breach procedures, and more.'),
  page('tool', '/tools/readiness-assessment', 'DPDP Readiness Assessment', 'Free DPDP Readiness Assessment',
    'Take a free 2-minute DPDP readiness assessment. Check 20 items across 6 compliance areas and get your instant readiness score. No login required.'),
  page('tool', '/tools/compliance-checklist', 'DPDP Compliance Checklist', 'DPDP Compliance Checklist',
    "Interactive checklist to track your organization's DPDP Act compliance progress. Covers consent, data rights, security, children's data, cross-border transfers, and retention."),
  page('tool', '/tools/privacy-policy', 'Privacy Policy Generator', 'Privacy Policy Generator',
    'Generate a DPDP Act-compliant privacy policy for your Indian business. Free, instant, downloadable.'),
  page('tool', '/tools/consent-notice', 'Consent Notice Builder', 'Consent Notice Builder',
    'Build DPDP-compliant consent notices for your application: pick the data you collect and its purposes, and get notice text to use. Free.'),
  page('tool', '/tools/consent-widget', 'Consent Widget Generator', 'Consent Widget Generator',
    'Generate an embeddable DPDP-compliant consent banner with granular controls. Supports English and Hindi. Free consent widget code.'),
  page('tool', '/tools/dpa-generator', 'Data Processing Agreement Generator', 'Data Processing Agreement Generator',
    'Generate DPDP Act-compliant data processing agreements between data fiduciaries and processors. Free DPA template generator.'),
  page('tool', '/tools/dsr-handler', 'Data Subject Request Handler', 'Data Subject Request Handler',
    'Generate DPDP-compliant response templates for data access, correction, erasure, and nomination requests. Free DSR handler tool.'),
  page('tool', '/tools/breach-checklist', 'Data Breach Response Checklist', 'Data Breach Response Checklist',
    "Step-by-step checklist for the mandatory 72-hour data breach notification under India's DPDP Act. Free downloadable guide."),
  page('tool', '/tools/countdown', 'DPDP Act Deadline Countdown', 'DPDP Act Deadline Countdown',
    'Countdown to DPDP Act compliance deadlines: Nov 14, 2026 for consent managers and May 14, 2027 for core obligations.'),
  {
    kind: 'page',
    path: '/dpdp-act',
    h1: 'DPDP Act 2023: Section-by-Section Guide',
    title: 'DPDP Act 2023 Explained: Section-by-Section Guide — DoAide DPDP',
    description:
      "Comprehensive guide to India's Digital Personal Data Protection Act 2023. Understand every section — consent, data rights, penalties, cross-border transfers. Free DPDP compliance guide.",
  },
  page('page', '/embed', 'Embed Compliance Widget', 'Embed DPDP Compliance Widget',
    'Embed the DPDP compliance score calculator on your website. Free embeddable widget for data protection compliance assessment.'),
  {
    kind: 'blog',
    path: '/blog',
    h1: 'Blog',
    title: 'DPDP Act Compliance Blog — DoAide DPDP',
    description:
      'Expert guides on DPDP Act compliance for Indian businesses. Learn about privacy policies, compliance steps, and deadlines.',
  },
  ...blogPosts.map((p) => ({
    kind: 'post',
    path: `/blog/${p.slug}`,
    h1: p.title,
    title: `${p.title} — DoAide DPDP`,
    description: p.excerpt,
    published: p.published,
    faqs: p.faqs,
  })),
]

export const canonicalFor = (path) => `${SITE.baseUrl}${path}`

export const metaForPath = (path) => routes.find((r) => r.path === path)

export function jsonLdFor(route) {
  const url = canonicalFor(route.path)
  let main
  switch (route.kind) {
    case 'home':
    case 'tool':
      main = {
        '@type': 'WebApplication',
        name: route.kind === 'home' ? SITE.name : route.h1,
        url,
        description: route.description,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        author: ORG,
      }
      break
    case 'post':
      main = {
        '@type': 'BlogPosting',
        headline: route.h1,
        description: route.description,
        url,
        mainEntityOfPage: url,
        datePublished: route.published,
        author: ORG,
        publisher: ORG,
      }
      break
    default:
      main = {
        '@type': route.kind === 'blog' ? 'Blog' : 'WebPage',
        name: route.h1,
        url,
        description: route.description,
        isPartOf: { '@type': 'WebSite', name: SITE.name, url: canonicalFor('/') },
      }
  }
  const graph = [main]
  if (route.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: route.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}
