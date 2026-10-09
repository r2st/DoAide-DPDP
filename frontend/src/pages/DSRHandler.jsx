import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import ShareButtons from '../components/ShareButtons'

const requestTypes = [
  { value: 'access', label: 'Data Access Request (Section 11)' },
  { value: 'correction', label: 'Data Correction Request (Section 12)' },
  { value: 'erasure', label: 'Data Erasure Request (Section 12)' },
  { value: 'nomination', label: 'Nomination Registration (Section 14)' },
]

function DSRHandler() {
  const [form, setForm] = useState({
    organization_name: '', request_type: 'access',
    data_principal_name: '', data_principal_email: '',
    request_details: '', dpo_name: '', dpo_email: '',
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/v1/dsr/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setResult({
        organization_name: form.organization_name,
        request_type: form.request_type,
        response_html: '<p>Unable to connect to server. Please ensure the backend is running.</p>',
        sla_days: 30,
        generated_at: new Date().toISOString(),
      })
    }
    setLoading(false)
  }

  const downloadHtml = () => {
    if (!result) return
    const blob = new Blob([result.response_html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dsr-response-${form.request_type}-${Date.now()}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (result) {
    return (
      <>
        <SEOHead title="Generated DSR Response" description="Your DPDP-compliant data subject request response template." path="/tools/dsr-handler" />
        <div className="container" style={{ padding: '48px 24px', maxWidth: '800px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Generated DSR Response</h1>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-primary" onClick={downloadHtml}>Download HTML</button>
              <button className="btn-secondary" onClick={() => setResult(null)}>Edit &amp; Regenerate</button>
            </div>
          </div>
          <div className="card" style={{ padding: '16px 24px', marginBottom: '16px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div><span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>SLA</span><br /><strong>{result.sla_days} days</strong></div>
            <div><span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Type</span><br /><strong style={{ textTransform: 'capitalize' }}>{result.request_type}</strong></div>
          </div>
          <div className="card" style={{ padding: '32px' }} dangerouslySetInnerHTML={{ __html: result.response_html }} />
          <div style={{ marginTop: '24px' }}>
            <ShareButtons title="DPDP Data Subject Request Handler" text="Handle data access, correction, and erasure requests under DPDP Act — free tool by DoAide!" />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEOHead
        title="Data Subject Request Handler"
        description="Generate DPDP-compliant response templates for data access, correction, erasure, and nomination requests. Free DSR handler tool."
        path="/tools/dsr-handler"
      />
      <div className="container" style={{ padding: '48px 24px', maxWidth: '700px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Data Subject Request Handler</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Generate DPDP-compliant response templates for Data Principal requests</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Organization Name *</label>
            <input value={form.organization_name} onChange={e => setForm(p => ({ ...p, organization_name: e.target.value }))} required />
          </div>

          <div className="form-group">
            <label>Request Type *</label>
            <select value={form.request_type} onChange={e => setForm(p => ({ ...p, request_type: e.target.value }))}>
              {requestTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>Data Principal Name *</label>
              <input value={form.data_principal_name} onChange={e => setForm(p => ({ ...p, data_principal_name: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Data Principal Email *</label>
              <input type="email" value={form.data_principal_email} onChange={e => setForm(p => ({ ...p, data_principal_email: e.target.value }))} required />
            </div>
          </div>

          <div className="form-group">
            <label>Request Details *</label>
            <textarea value={form.request_details} onChange={e => setForm(p => ({ ...p, request_details: e.target.value }))} required rows={4} placeholder="Describe the data subject's request..." style={{ resize: 'vertical' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>Data Protection Officer Name *</label>
              <input value={form.dpo_name} onChange={e => setForm(p => ({ ...p, dpo_name: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>DPO Email *</label>
              <input type="email" value={form.dpo_email} onChange={e => setForm(p => ({ ...p, dpo_email: e.target.value }))} required />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading || !form.organization_name || !form.data_principal_name || !form.data_principal_email || form.request_details.length < 10 || !form.dpo_name || !form.dpo_email}>
            {loading ? 'Generating...' : 'Generate Response Template'}
          </button>
        </form>
      </div>
    </>
  )
}

export default DSRHandler
