import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

function Embed() {
  const [copied, setCopied] = useState(false)

  const embedCode = `<iframe
  src="${typeof window !== 'undefined' ? window.location.origin : ''}/tools/compliance-score"
  width="100%"
  height="700"
  frameborder="0"
  style="border: 1px solid #2a2a2a; border-radius: 12px;"
  title="DPDP Compliance Score Calculator"
></iframe>`

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Helmet>
        <title>Embed DPDP Compliance Widget — DoAide DPDP</title>
        <meta name="description" content="Embed the DPDP compliance score calculator on your website. Free embeddable widget for data protection compliance assessment." />
      </Helmet>

      <div className="container" style={{ padding: '48px 24px', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Embed Compliance Widget</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Add the DPDP Compliance Score Calculator to your website. Free for any website.
        </p>

        <div className="card" style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Embed Code</h3>
          <pre style={{
            background: 'var(--bg-secondary)',
            padding: '16px',
            borderRadius: 'var(--radius-sm)',
            overflow: 'auto',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          }}>
            {embedCode}
          </pre>
          <button className="btn-primary" style={{ marginTop: '12px' }} onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy Embed Code'}
          </button>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Preview</h3>
          <div style={{
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            background: 'var(--bg-primary)',
            padding: '24px',
            textAlign: 'center',
          }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              The compliance score calculator widget will appear here when the dev server is running.
            </p>
          </div>
        </div>

        <div className="card" style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Features</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              'Free for any website',
              'Responsive design — works on all screen sizes',
              'Dark theme compatible',
              '20-question compliance assessment',
              'Instant score with recommendations',
              'Share results on WhatsApp, Twitter, LinkedIn',
            ].map(f => (
              <li key={f} style={{ fontSize: '14px', color: 'var(--text-secondary)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ color: 'var(--success)' }}>&#10003;</span> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Embed
