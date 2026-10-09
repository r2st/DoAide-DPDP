import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import JsonLd from '../components/JsonLd'
import ShareButtons from '../components/ShareButtons'

const checklist = [
  { id: 'r1', category: 'Data Inventory', text: 'We have a documented inventory of all personal data we collect and process' },
  { id: 'r2', category: 'Data Inventory', text: 'We know which third parties have access to our users\' personal data' },
  { id: 'r3', category: 'Consent', text: 'We collect explicit opt-in consent before processing personal data' },
  { id: 'r4', category: 'Consent', text: 'Our consent notices are in clear, plain language (not legal jargon)' },
  { id: 'r5', category: 'Consent', text: 'Users can withdraw consent as easily as they gave it (e.g., one click)' },
  { id: 'r6', category: 'Consent', text: 'We obtain separate consent for each processing purpose (no bundled consent)' },
  { id: 'r7', category: 'Privacy Policy', text: 'We have a published privacy policy that covers all DPDP-required sections' },
  { id: 'r8', category: 'Privacy Policy', text: 'Our privacy policy specifies all data categories collected and their purposes' },
  { id: 'r9', category: 'Data Rights', text: 'Users can request access to a summary of their personal data' },
  { id: 'r10', category: 'Data Rights', text: 'Users can request correction or erasure of their personal data' },
  { id: 'r11', category: 'Data Rights', text: 'We respond to data rights requests within 30 days' },
  { id: 'r12', category: 'Security', text: 'We have reasonable security safeguards (encryption, access controls) in place' },
  { id: 'r13', category: 'Security', text: 'We have a documented data breach response plan' },
  { id: 'r14', category: 'Security', text: 'We can notify the Data Protection Board and affected users within 72 hours of a breach' },
  { id: 'r15', category: 'Governance', text: 'We have appointed a Data Protection Officer or equivalent' },
  { id: 'r16', category: 'Governance', text: 'We have a grievance redressal mechanism with published contact details' },
  { id: 'r17', category: 'Governance', text: 'We have a defined data retention and deletion policy' },
  { id: 'r18', category: 'Children & Transfers', text: 'If we process children\'s data (under 18), we obtain verifiable parental consent' },
  { id: 'r19', category: 'Children & Transfers', text: 'If we transfer data outside India, we only send to government-approved countries' },
  { id: 'r20', category: 'Children & Transfers', text: 'We have Data Processing Agreements with all our data processors/vendors' },
]

const categories = [...new Set(checklist.map(item => item.category))]

const grading = [
  { min: 0, max: 25, label: 'Critical', color: 'var(--danger)', message: 'Your organization has significant compliance gaps. Immediate action is needed before the Nov 2026 deadline.' },
  { min: 26, max: 50, label: 'At Risk', color: 'var(--warning)', message: 'You\'ve started but have major areas to address. Prioritize consent management and data rights.' },
  { min: 51, max: 75, label: 'Progressing', color: 'var(--info)', message: 'Good progress, but gaps remain. Focus on security, governance, and breach response.' },
  { min: 76, max: 90, label: 'Almost Ready', color: 'var(--success)', message: 'You\'re well-prepared. Review the unchecked items to close remaining gaps.' },
  { min: 91, max: 100, label: 'DPDP Ready', color: 'var(--success)', message: 'Excellent! Your organization appears well-prepared for DPDP compliance. Keep monitoring for regulatory updates.' },
]

function ReadinessAssessment() {
  const [checked, setChecked] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const toggle = (id) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const checkedCount = Object.values(checked).filter(Boolean).length
  const score = Math.round((checkedCount / checklist.length) * 100)
  const grade = grading.find(g => score >= g.min && score <= g.max)

  const getCategoryScore = (cat) => {
    const items = checklist.filter(i => i.category === cat)
    const done = items.filter(i => checked[i.id]).length
    return { done, total: items.length, pct: Math.round((done / items.length) * 100) }
  }

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>Your DPDP Readiness Score — DoAide DPDP</title>
        </Helmet>
        <div className="container" style={{ padding: '48px 24px', maxWidth: '700px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', textAlign: 'center' }}>Your DPDP Readiness Score</h1>

          <div className="card" style={{ textAlign: 'center', marginBottom: '32px', padding: '40px' }}>
            <div style={{
              width: '160px', height: '160px', borderRadius: '50%', margin: '0 auto 20px',
              border: `6px solid ${grade.color}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
            }}>
              <span style={{ fontSize: '48px', fontWeight: 800, color: grade.color }}>{score}</span>
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>/ 100</span>
            </div>
            <div style={{
              display: 'inline-block', padding: '6px 20px', borderRadius: '20px',
              background: grade.color + '22', color: grade.color,
              fontWeight: 600, fontSize: '16px', marginBottom: '16px',
            }}>
              {grade.label}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '500px', margin: '0 auto' }}>
              {grade.message}
            </p>
          </div>

          <h3 style={{ marginBottom: '16px' }}>Breakdown by Area</h3>
          {categories.map(cat => {
            const s = getCategoryScore(cat)
            return (
              <div key={cat} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px' }}>{cat}</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{s.done}/{s.total} ({s.pct}%)</span>
                </div>
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${s.pct}%`, height: '100%', borderRadius: '4px',
                    background: s.pct >= 70 ? 'var(--success)' : s.pct >= 40 ? 'var(--warning)' : 'var(--danger)',
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </div>
            )
          })}

          {checkedCount < checklist.length && (
            <div className="card" style={{ marginTop: '32px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Areas to Address</h3>
              <ul style={{ paddingLeft: '20px' }}>
                {checklist.filter(i => !checked[i.id]).map(item => (
                  <li key={item.id} style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '6px' }}>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/tools/compliance-score" className="btn-primary" style={{ flex: 1, textAlign: 'center', minWidth: '200px' }}>
              Take Detailed Assessment
            </Link>
            <Link to="/tools" className="btn-secondary" style={{ flex: 1, textAlign: 'center', minWidth: '200px' }}>
              Explore Free Tools
            </Link>
          </div>

          <div style={{ marginTop: '24px' }}>
            <ShareButtons title={`My DPDP Readiness Score: ${score}/100 (${grade.label})`} text={`I scored ${score}/100 on the DPDP readiness assessment. Check yours!`} />
          </div>

          <button className="btn-secondary" style={{ marginTop: '16px', width: '100%' }} onClick={() => { setSubmitted(false); setChecked({}); }}>
            Retake Assessment
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Free DPDP Readiness Assessment — DoAide DPDP</title>
        <meta name="description" content="Take a free 2-minute DPDP readiness assessment. Check 20 items across 6 compliance areas and get your instant readiness score. No login required." />
      </Helmet>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Quiz', name: 'DPDP Readiness Assessment', description: 'Free 2-minute DPDP Act readiness checklist for Indian businesses' }} />

      <div className="container" style={{ padding: '48px 24px', maxWidth: '700px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>DPDP Readiness Assessment</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Quick 2-minute checklist — no login required. Check the items your organization has in place.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '32px' }}>
          {checkedCount}/{checklist.length} items checked
        </p>

        {categories.map(cat => (
          <div key={cat} style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: 'var(--gold)' }}>{cat}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {checklist.filter(i => i.category === cat).map(item => (
                <label
                  key={item.id}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                    border: `1px solid ${checked[item.id] ? 'var(--success)' : 'var(--border)'}`,
                    background: checked[item.id] ? 'rgba(34,197,94,0.08)' : 'var(--bg-card)',
                    transition: 'all 0.2s',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!checked[item.id]}
                    onChange={() => toggle(item.id)}
                    style={{ marginTop: '2px', accentColor: 'var(--success)', width: '18px', height: '18px', flexShrink: 0 }}
                  />
                  <span style={{ fontSize: '14px', color: checked[item.id] ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button className="btn-primary" style={{ width: '100%', fontSize: '18px', padding: '16px' }} onClick={() => setSubmitted(true)}>
          Get My Readiness Score ({checkedCount}/{checklist.length})
        </button>
      </div>
    </>
  )
}

export default ReadinessAssessment
