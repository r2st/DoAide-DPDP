import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import JsonLd from '../components/JsonLd'
import ShareButtons from '../components/ShareButtons'
import { blogPosts } from './blogData'

function renderMarkdown(content) {
  const lines = content.trim().split('\n')
  const html = []
  let inList = false
  let inTable = false
  let tableRows = []

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (trimmed.replace(/[|\-\s]/g, '') === '') continue
      const cells = trimmed.split('|').filter(c => c.trim()).map(c => c.trim())
      if (!inTable) {
        inTable = true
        tableRows = [cells]
      } else {
        tableRows.push(cells)
      }
      continue
    } else if (inTable) {
      const headerRow = tableRows[0]
      const bodyRows = tableRows.slice(1)
      html.push(`<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px"><thead><tr>${headerRow.map(c => `<th style="border:1px solid var(--border);padding:8px;text-align:left">${c}</th>`).join('')}</tr></thead><tbody>${bodyRows.map(row => `<tr>${row.map(c => `<td style="border:1px solid var(--border);padding:8px">${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`)
      inTable = false
      tableRows = []
    }

    if (trimmed === '') {
      if (inList) { html.push('</ul>'); inList = false }
      continue
    }

    if (trimmed.startsWith('## ')) {
      html.push(`<h2 style="font-size:24px;font-weight:700;margin:32px 0 12px">${trimmed.slice(3)}</h2>`)
    } else if (trimmed.startsWith('### ')) {
      html.push(`<h3 style="font-size:18px;font-weight:600;margin:24px 0 8px">${trimmed.slice(4)}</h3>`)
    } else if (trimmed.startsWith('- ')) {
      if (!inList) { html.push('<ul style="margin:8px 0;padding-left:24px">'); inList = true }
      const text = trimmed.slice(2).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:var(--gold)">$1</a>')
      html.push(`<li style="margin:4px 0;font-size:14px;color:var(--text-secondary)">${text}</li>`)
    } else if (/^\d+\.\s/.test(trimmed)) {
      const text = trimmed.replace(/^\d+\.\s/, '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:var(--gold)">$1</a>')
      html.push(`<p style="margin:8px 0;padding-left:16px;font-size:14px;color:var(--text-secondary)"><strong>${trimmed.match(/^\d+/)[0]}.</strong> ${text}</p>`)
    } else {
      const text = trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:var(--gold)">$1</a>')
      html.push(`<p style="margin:8px 0;font-size:15px;line-height:1.7;color:var(--text-secondary)">${text}</p>`)
    }
  }

  if (inList) html.push('</ul>')
  if (inTable && tableRows.length > 0) {
    const headerRow = tableRows[0]
    const bodyRows = tableRows.slice(1)
    html.push(`<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px"><thead><tr>${headerRow.map(c => `<th style="border:1px solid var(--border);padding:8px;text-align:left">${c}</th>`).join('')}</tr></thead><tbody>${bodyRows.map(row => `<tr>${row.map(c => `<td style="border:1px solid var(--border);padding:8px">${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`)
  }

  return html.join('\n')
}

function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="container" style={{ padding: '48px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '16px' }}>Post Not Found</h1>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{post.title} — DoAide DPDP</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: { '@type': 'Organization', name: 'DoAide' },
        publisher: { '@type': 'Organization', name: 'DoAide' },
      }} />
      {post.faqs && post.faqs.length > 0 && (
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }} />
      )}

      <div className="container" style={{ padding: '48px 24px', maxWidth: '800px' }}>
        <Link to="/blog" style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'block', marginBottom: '24px' }}>
          &larr; Back to Blog
        </Link>

        <article>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {post.tags.map(tag => <span key={tag} className="badge badge-free">{tag}</span>)}
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px', lineHeight: 1.3 }}>{post.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>{post.date} · {post.readTime}</p>
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />

          {post.faqs && post.faqs.length > 0 && (
            <div style={{ marginTop: '40px', padding: '24px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Frequently Asked Questions</h2>
              {post.faqs.map((faq, i) => (
                <div key={i} style={{ marginBottom: i < post.faqs.length - 1 ? '20px' : 0, paddingBottom: i < post.faqs.length - 1 ? '20px' : 0, borderBottom: i < post.faqs.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>{faq.question}</h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          )}
        </article>

        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>Share this article</h4>
          <ShareButtons title={post.title} text={post.excerpt} />
        </div>
      </div>
    </>
  )
}

export default BlogPost
