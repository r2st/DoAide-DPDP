import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ShareButtons from '../components/ShareButtons'

const availableCategories = [
  'Name', 'Email', 'Phone', 'Address', 'Date of Birth', 'Financial Data',
  'Health Data', 'Location Data', 'Device Info', 'Usage Data', 'Photos',
]

const availablePurposes = [
  'Service Delivery', 'Marketing', 'Analytics', 'Personalization',
  'Legal Compliance', 'Payment Processing', 'Customer Support',
]

function ConsentNotice() {
  const [form, setForm] = useState({
    organization_name: '',
    data_categories: [],
    processing_purposes: [],
    retention_period: '1 year',
    has_withdrawal_option: true,
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

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
      const res = await fetch('/api/v1/consent-notice/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setResult({
        organization_name: form.organization_name,
        notice_html: '<p>Unable to connect to server. Please ensure the backend is running.</p>',
        generated_at: new Date().toISOString(),
      })
    }
    setLoading(false)
  }

  if (result) {
    return (
      <>
        <Helmet><title>Generated Consent Notice — DoAide DPDP</title></Helmet>
        <div className="container" style={{ padding: '48px 24px', maxWidth: '800px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Generated Consent Notice</h1>
            <button className="btn-secondary" onClick={() => setResult(null)}>Edit &amp; Regenerate</button>
          </div>
          <div className="card" style={{ padding: '32px' }} dangerouslySetInnerHTML={{ __html: result.notice_html }} />
          <div style={{ marginTop: '24px' }}>
            <ShareButtons title="DPDP Consent Notice Builder" text="Build DPDP-compliant consent notices with DoAide DPDP — free!" />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Consent Notice Builder — DoAide DPDP</title>
        <meta name="description" content="Build DPDP-compliant consent notices for your application. Free drag-and-drop builder." />
      </Helmet>
      <div className="container" style={{ padding: '48px 24px', maxWidth: '700px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Consent Notice Builder</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Create DPDP-compliant consent notices</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Organization Name *</label>
            <input value={form.organization_name} onChange={e => setForm(p => ({ ...p, organization_name: e.target.value }))} required />
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
            <label>Data Retention Period *</label>
            <select value={form.retention_period} onChange={e => setForm(p => ({ ...p, retention_period: e.target.value }))}>
              <option value="6 months">6 months</option>
              <option value="1 year">1 year</option>
              <option value="2 years">2 years</option>
              <option value="3 years">3 years</option>
              <option value="5 years">5 years</option>
              <option value="As required by law">As required by law</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.has_withdrawal_option} onChange={e => setForm(p => ({ ...p, has_withdrawal_option: e.target.checked }))} style={{ width: 'auto' }} />
              Include consent withdrawal section
            </label>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading || !form.organization_name || form.data_categories.length === 0 || form.processing_purposes.length === 0}>
            {loading ? 'Generating...' : 'Generate Consent Notice'}
          </button>
        </form>
      </div>
    </>
  )
}

export default ConsentNotice
