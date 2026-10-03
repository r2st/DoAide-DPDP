import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ShareButtons from '../components/ShareButtons'

const businessTypes = [
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'edtech', label: 'EdTech' },
  { value: 'saas', label: 'SaaS' },
  { value: 'social_media', label: 'Social Media' },
  { value: 'logistics', label: 'Logistics' },
  { value: 'retail', label: 'Retail' },
  { value: 'telecom', label: 'Telecom' },
  { value: 'other', label: 'Other' },
]

const dataCategories = [
  'Name', 'Email Address', 'Phone Number', 'Address', 'Date of Birth',
  'Financial Data', 'Health Data', 'Biometric Data', 'Location Data',
  'Device Information', 'Usage Data', 'Aadhaar Number', 'PAN Number',
]

const processingPurposes = [
  'Service Delivery', 'Order Fulfillment', 'Customer Support',
  'Marketing Communications', 'Analytics', 'Personalization',
  'Legal Compliance', 'Payment Processing', 'Account Management',
]

function PrivacyPolicy() {
  const [form, setForm] = useState({
    business_name: '', business_type: 'ecommerce',
    data_categories: [], processing_purposes: [],
    has_children_data: false, transfers_data_abroad: false,
    contact_email: '',
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
      const res = await fetch('/api/v1/privacy-policy/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setResult({
        business_name: form.business_name,
        policy_html: '<p>Unable to connect to server. Please ensure the backend is running.</p>',
        sections: [],
        generated_at: new Date().toISOString(),
      })
    }
    setLoading(false)
  }

  const downloadHtml = () => {
    if (!result) return
    const blob = new Blob([result.policy_html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `privacy-policy-${form.business_name.toLowerCase().replace(/\s+/g, '-')}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (result) {
    return (
      <>
        <Helmet><title>Generated Privacy Policy — DoAide DPDP</title></Helmet>
        <div className="container" style={{ padding: '48px 24px', maxWidth: '800px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Generated Privacy Policy</h1>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-primary" onClick={downloadHtml}>Download HTML</button>
              <button className="btn-secondary" onClick={() => setResult(null)}>Edit &amp; Regenerate</button>
            </div>
          </div>
          <div className="card" style={{ padding: '32px' }} dangerouslySetInnerHTML={{ __html: result.policy_html }} />
          <div style={{ marginTop: '24px' }}>
            <ShareButtons title={`DPDP-compliant Privacy Policy for ${result.business_name}`} text="I just generated a DPDP-compliant privacy policy using DoAide DPDP!" />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Privacy Policy Generator — DoAide DPDP</title>
        <meta name="description" content="Generate a DPDP Act-compliant privacy policy for your Indian business. Free, instant, downloadable." />
      </Helmet>
      <div className="container" style={{ padding: '48px 24px', maxWidth: '700px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Privacy Policy Generator</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Generate a DPDP Act-compliant privacy policy for your business</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Business Name *</label>
            <input value={form.business_name} onChange={e => setForm(p => ({ ...p, business_name: e.target.value }))} required />
          </div>

          <div className="form-group">
            <label>Business Type *</label>
            <select value={form.business_type} onChange={e => setForm(p => ({ ...p, business_type: e.target.value }))}>
              {businessTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Contact Email *</label>
            <input type="email" value={form.contact_email} onChange={e => setForm(p => ({ ...p, contact_email: e.target.value }))} required />
          </div>

          <div className="form-group">
            <label>Data Categories Collected * (select all that apply)</label>
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
            <label>Processing Purposes * (select all that apply)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {processingPurposes.map(p => (
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

          <div className="form-group" style={{ display: 'flex', gap: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.has_children_data} onChange={e => setForm(p => ({ ...p, has_children_data: e.target.checked }))} style={{ width: 'auto' }} />
              We collect children's data (under 18)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.transfers_data_abroad} onChange={e => setForm(p => ({ ...p, transfers_data_abroad: e.target.checked }))} style={{ width: 'auto' }} />
              We transfer data abroad
            </label>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading || !form.business_name || !form.contact_email || form.data_categories.length === 0 || form.processing_purposes.length === 0}>
            {loading ? 'Generating...' : 'Generate Privacy Policy'}
          </button>
        </form>
      </div>
    </>
  )
}

export default PrivacyPolicy
