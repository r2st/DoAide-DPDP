import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import ShareButtons from '../components/ShareButtons'

const availableCategories = [
  'Name', 'Email', 'Phone', 'Address', 'Date of Birth', 'Financial Data',
  'Health Data', 'Location Data', 'Device Info', 'Usage Data', 'Photos', 'Biometric Data',
]

const availablePurposes = [
  'Service Delivery', 'Marketing', 'Analytics', 'Personalization',
  'Legal Compliance', 'Payment Processing', 'Customer Support', 'Advertising',
]

function ConsentWidget() {
  const [form, setForm] = useState({
    organization_name: '', data_categories: [],
    processing_purposes: [], privacy_policy_url: '',
    theme: 'dark', position: 'bottom', language: 'en',
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState({ widget: false, script: false })

  const toggleItem = (field, item) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(item) ? prev[field].filter(i => i !== item) : [...prev[field], item],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/v1/consent-widget/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setResult({
        organization_name: form.organization_name,
        widget_html: '<!-- Unable to connect to server -->',
        embed_script: '<!-- Unable to connect to server -->',
        generated_at: new Date().toISOString(),
      })
    }
    setLoading(false)
  }

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopied(prev => ({ ...prev, [key]: true }))
    setTimeout(() => setCopied(prev => ({ ...prev, [key]: false })), 2000)
  }

  if (result) {
    return (
      <>
        <SEOHead title="Generated Consent Widget" description="Your DPDP-compliant consent widget code is ready." path="/tools/consent-widget" />
        <div className="container" style={{ padding: '48px 24px', maxWidth: '800px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Generated Consent Widget</h1>
            <button className="btn-secondary" onClick={() => setResult(null)}>Edit &amp; Regenerate</button>
          </div>

          <div className="card" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Full Widget HTML</h3>
              <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={() => copyText(result.widget_html, 'widget')}>
                {copied.widget ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <pre style={{
              background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-sm)',
              overflow: 'auto', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5,
              maxHeight: '300px', whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            }}>
              {result.widget_html}
            </pre>
          </div>

          <div className="card" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Quick Embed Script</h3>
              <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={() => copyText(result.embed_script, 'script')}>
                {copied.script ? 'Copied!' : 'Copy Script'}
              </button>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '12px' }}>
              Paste this single line before your closing &lt;/body&gt; tag for a quick consent banner.
            </p>
            <pre style={{
              background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-sm)',
              overflow: 'auto', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5,
              whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            }}>
              {result.embed_script}
            </pre>
          </div>

          <div style={{ marginTop: '24px' }}>
            <ShareButtons title="DPDP Consent Widget Generator" text="Generate embeddable DPDP-compliant consent banners with DoAide — free!" />
          </div>
        </div>
      </>
    )
  }

  const radioStyle = (active) => ({
    padding: '8px 16px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer',
    border: `1px solid ${active ? 'var(--gold)' : 'var(--border)'}`,
    background: active ? 'var(--gold-light)' : 'transparent',
    color: active ? 'var(--gold)' : 'var(--text-secondary)',
  })

  return (
    <>
      <SEOHead
        title="Consent Widget Generator"
        description="Generate an embeddable DPDP-compliant consent banner with granular controls. Supports English and Hindi. Free consent widget code."
        path="/tools/consent-widget"
      />
      <div className="container" style={{ padding: '48px 24px', maxWidth: '700px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Consent Widget Generator</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Generate an embeddable DPDP-compliant consent banner for your website</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Organization Name *</label>
            <input value={form.organization_name} onChange={e => setForm(p => ({ ...p, organization_name: e.target.value }))} required />
          </div>

          <div className="form-group">
            <label>Privacy Policy URL *</label>
            <input value={form.privacy_policy_url} onChange={e => setForm(p => ({ ...p, privacy_policy_url: e.target.value }))} required placeholder="https://yoursite.com/privacy-policy" />
          </div>

          <div className="form-group">
            <label>Data Categories * (click to select)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {availableCategories.map(cat => (
                <button key={cat} type="button" onClick={() => toggleItem('data_categories', cat)} style={{
                  padding: '6px 14px', borderRadius: '20px', fontSize: '13px',
                  border: `1px solid ${form.data_categories.includes(cat) ? 'var(--gold)' : 'var(--border)'}`,
                  background: form.data_categories.includes(cat) ? 'var(--gold-light)' : 'transparent',
                  color: form.data_categories.includes(cat) ? 'var(--gold)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Processing Purposes * (click to select)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {availablePurposes.map(p => (
                <button key={p} type="button" onClick={() => toggleItem('processing_purposes', p)} style={{
                  padding: '6px 14px', borderRadius: '20px', fontSize: '13px',
                  border: `1px solid ${form.processing_purposes.includes(p) ? 'var(--gold)' : 'var(--border)'}`,
                  background: form.processing_purposes.includes(p) ? 'var(--gold-light)' : 'transparent',
                  color: form.processing_purposes.includes(p) ? 'var(--gold)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                }}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Theme</label>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button type="button" onClick={() => setForm(p => ({ ...p, theme: 'dark' }))} style={radioStyle(form.theme === 'dark')}>Dark</button>
              <button type="button" onClick={() => setForm(p => ({ ...p, theme: 'light' }))} style={radioStyle(form.theme === 'light')}>Light</button>
            </div>
          </div>

          <div className="form-group">
            <label>Position</label>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button type="button" onClick={() => setForm(p => ({ ...p, position: 'bottom' }))} style={radioStyle(form.position === 'bottom')}>Bottom</button>
              <button type="button" onClick={() => setForm(p => ({ ...p, position: 'center' }))} style={radioStyle(form.position === 'center')}>Center</button>
              <button type="button" onClick={() => setForm(p => ({ ...p, position: 'top' }))} style={radioStyle(form.position === 'top')}>Top</button>
            </div>
          </div>

          <div className="form-group">
            <label>Language</label>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button type="button" onClick={() => setForm(p => ({ ...p, language: 'en' }))} style={radioStyle(form.language === 'en')}>English</button>
              <button type="button" onClick={() => setForm(p => ({ ...p, language: 'hi' }))} style={radioStyle(form.language === 'hi')}>Hindi</button>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading || !form.organization_name || !form.privacy_policy_url || form.data_categories.length === 0 || form.processing_purposes.length === 0}>
            {loading ? 'Generating...' : 'Generate Consent Widget'}
          </button>
        </form>
      </div>
    </>
  )
}

export default ConsentWidget
