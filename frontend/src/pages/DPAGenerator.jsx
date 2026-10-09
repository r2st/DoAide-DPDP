import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import ShareButtons from '../components/ShareButtons'

const dataCategories = [
  'Customer Names', 'Email Addresses', 'Phone Numbers', 'Physical Addresses',
  'Financial Data', 'Health Data', 'Employee Data', 'Usage Data',
  'Device Information', 'Location Data', 'Purchase History', 'Biometric Data',
]

const securityMeasures = [
  'Encryption at rest', 'Encryption in transit', 'Access controls',
  'Audit logging', 'Firewall protection', 'Multi-factor authentication',
  'Regular backups', 'Penetration testing',
]

function DPAGenerator() {
  const [form, setForm] = useState({
    controller_name: '', processor_name: '',
    processing_description: '', data_categories: [],
    security_measures: [], sub_processors: [],
  })
  const [spInput, setSpInput] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const toggleItem = (field, item) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(item) ? prev[field].filter(i => i !== item) : [...prev[field], item],
    }))
  }

  const addSubProcessor = () => {
    if (spInput.trim() && !form.sub_processors.includes(spInput.trim())) {
      setForm(prev => ({ ...prev, sub_processors: [...prev.sub_processors, spInput.trim()] }))
      setSpInput('')
    }
  }

  const removeSubProcessor = (sp) => {
    setForm(prev => ({ ...prev, sub_processors: prev.sub_processors.filter(s => s !== sp) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/v1/dpa/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setResult({
        controller_name: form.controller_name,
        processor_name: form.processor_name,
        agreement_html: '<p>Unable to connect to server. Please ensure the backend is running.</p>',
        generated_at: new Date().toISOString(),
      })
    }
    setLoading(false)
  }

  const downloadHtml = () => {
    if (!result) return
    const blob = new Blob([result.agreement_html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dpa-${form.controller_name.toLowerCase().replace(/\s+/g, '-')}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (result) {
    return (
      <>
        <SEOHead title="Generated Data Processing Agreement" description="Your DPDP-compliant DPA has been generated." path="/tools/dpa-generator" />
        <div className="container" style={{ padding: '48px 24px', maxWidth: '800px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Generated DPA</h1>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-primary" onClick={downloadHtml}>Download HTML</button>
              <button className="btn-secondary" onClick={() => setResult(null)}>Edit &amp; Regenerate</button>
            </div>
          </div>
          <div className="card" style={{ padding: '32px' }} dangerouslySetInnerHTML={{ __html: result.agreement_html }} />
          <div style={{ marginTop: '24px' }}>
            <ShareButtons title="DPDP-compliant Data Processing Agreement" text="I just generated a DPDP-compliant DPA using DoAide DPDP — free!" />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEOHead
        title="Data Processing Agreement Generator"
        description="Generate DPDP Act-compliant data processing agreements between data fiduciaries and processors. Free DPA template generator."
        path="/tools/dpa-generator"
      />
      <div className="container" style={{ padding: '48px 24px', maxWidth: '700px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Data Processing Agreement Generator</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Generate a DPDP Act-compliant DPA between Data Fiduciary and Data Processor</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Data Fiduciary (Controller) Name *</label>
            <input value={form.controller_name} onChange={e => setForm(p => ({ ...p, controller_name: e.target.value }))} required />
          </div>

          <div className="form-group">
            <label>Data Processor Name *</label>
            <input value={form.processor_name} onChange={e => setForm(p => ({ ...p, processor_name: e.target.value }))} required />
          </div>

          <div className="form-group">
            <label>Processing Description *</label>
            <textarea value={form.processing_description} onChange={e => setForm(p => ({ ...p, processing_description: e.target.value }))} required rows={4} placeholder="Describe the data processing activities..." style={{ resize: 'vertical' }} />
          </div>

          <div className="form-group">
            <label>Categories of Personal Data * (select all that apply)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {dataCategories.map(cat => (
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
            <label>Security Measures * (select all that apply)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {securityMeasures.map(m => (
                <button key={m} type="button" onClick={() => toggleItem('security_measures', m)} style={{
                  padding: '6px 14px', borderRadius: '20px', fontSize: '13px',
                  border: `1px solid ${form.security_measures.includes(m) ? 'var(--gold)' : 'var(--border)'}`,
                  background: form.security_measures.includes(m) ? 'var(--gold-light)' : 'transparent',
                  color: form.security_measures.includes(m) ? 'var(--gold)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                }}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Sub-Processors (optional)</label>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <input value={spInput} onChange={e => setSpInput(e.target.value)} placeholder="e.g., AWS India, SendGrid" onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSubProcessor() } }} style={{ flex: 1 }} />
              <button type="button" className="btn-secondary" style={{ padding: '12px 20px', fontSize: '14px' }} onClick={addSubProcessor}>Add</button>
            </div>
            {form.sub_processors.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                {form.sub_processors.map(sp => (
                  <span key={sp} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '6px 12px', borderRadius: '20px', fontSize: '13px',
                    background: 'var(--gold-light)', color: 'var(--gold)', border: '1px solid var(--gold)',
                  }}>
                    {sp}
                    <button type="button" onClick={() => removeSubProcessor(sp)} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '16px', lineHeight: 1, padding: 0 }}>&times;</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading || !form.controller_name || !form.processor_name || form.processing_description.length < 10 || form.data_categories.length === 0 || form.security_measures.length === 0}>
            {loading ? 'Generating...' : 'Generate DPA'}
          </button>
        </form>
      </div>
    </>
  )
}

export default DPAGenerator
