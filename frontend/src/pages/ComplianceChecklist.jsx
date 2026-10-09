import { useState, useEffect } from 'react'
import SEOHead from '../components/SEOHead'
import ShareButtons from '../components/ShareButtons'

const STORAGE_KEY = 'dpdp_compliance_checklist'

const checklistSections = [
  {
    title: 'Legal & Governance',
    items: [
      { id: 'lg1', text: 'Appoint a Data Protection Officer (DPO) or equivalent contact person' },
      { id: 'lg2', text: 'Determine if you qualify as a Significant Data Fiduciary and register accordingly' },
      { id: 'lg3', text: 'Establish a formal grievance redressal mechanism with published contact details' },
      { id: 'lg4', text: 'Review and update privacy policy to meet DPDP Act requirements' },
      { id: 'lg5', text: 'Conduct a Data Protection Impact Assessment (DPIA) for high-risk processing' },
    ],
  },
  {
    title: 'Consent Management',
    items: [
      { id: 'cm1', text: 'Implement opt-in consent mechanism (no pre-checked boxes)' },
      { id: 'cm2', text: 'Ensure consent notices are in clear, plain language (Section 5)' },
      { id: 'cm3', text: 'Build consent withdrawal mechanism that is as easy as giving consent' },
      { id: 'cm4', text: 'Maintain a consent audit trail (who consented, when, to what purpose)' },
      { id: 'cm5', text: 'Register as a Consent Manager if managing consent on behalf of others' },
    ],
  },
  {
    title: 'Data Principal Rights',
    items: [
      { id: 'dr1', text: 'Build data access request portal (Section 11 — right to information)' },
      { id: 'dr2', text: 'Enable data correction mechanism (Section 12 — right to correction)' },
      { id: 'dr3', text: 'Enable data erasure mechanism (Section 12 — right to erasure)' },
      { id: 'dr4', text: 'Implement nomination mechanism for incapacity/death scenarios (Section 14)' },
      { id: 'dr5', text: 'Set up grievance response SLA: acknowledge in 48 hours, resolve in 30 days' },
    ],
  },
  {
    title: 'Data Security',
    items: [
      { id: 'ds1', text: 'Implement encryption for personal data at rest and in transit' },
      { id: 'ds2', text: 'Set up access controls and role-based access for personal data' },
      { id: 'ds3', text: 'Conduct security audit of all systems that process personal data' },
      { id: 'ds4', text: 'Implement breach detection, alerting, and incident response procedures' },
    ],
  },
  {
    title: "Children's Data",
    items: [
      { id: 'cd1', text: 'Implement age verification mechanism for users under 18' },
      { id: 'cd2', text: 'Build verifiable parental/guardian consent flow (Section 9)' },
      { id: 'cd3', text: 'Disable tracking, behavioural monitoring, and targeted ads for minors' },
    ],
  },
  {
    title: 'Cross-Border Transfers',
    items: [
      { id: 'cb1', text: 'Audit all cross-border personal data flows and document destinations' },
      { id: 'cb2', text: 'Ensure transfers only to Central Government-approved countries (Section 16)' },
      { id: 'cb3', text: 'Maintain transfer records with legal basis for each cross-border flow' },
    ],
  },
  {
    title: 'Data Retention',
    items: [
      { id: 'rt1', text: 'Define retention periods for each category of personal data collected' },
      { id: 'rt2', text: 'Implement automated data erasure schedules when purpose is fulfilled' },
      { id: 'rt3', text: 'Document a register of data processing activities (ROPA)' },
    ],
  },
]

function ComplianceChecklist() {
  const [checked, setChecked] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)) } catch { /* no-op */ }
  }, [checked])

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }))

  const totalItems = checklistSections.reduce((sum, s) => sum + s.items.length, 0)
  const checkedCount = Object.values(checked).filter(Boolean).length
  const progress = Math.round((checkedCount / totalItems) * 100)

  const getSectionProgress = (section) => {
    const done = section.items.filter(i => checked[i.id]).length
    return Math.round((done / section.items.length) * 100)
  }

  return (
    <>
      <SEOHead
        title="DPDP Compliance Checklist"
        description="Interactive checklist to track your organization's DPDP Act compliance progress. Covers consent, data rights, security, children's data, cross-border transfers, and retention."
        path="/tools/compliance-checklist"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'DPDP Act Compliance Checklist',
          description: 'Step-by-step checklist for achieving compliance with India\'s Digital Personal Data Protection Act, 2023',
          step: checklistSections.map(s => ({
            '@type': 'HowToStep', name: s.title,
            itemListElement: s.items.map(i => ({ '@type': 'HowToDirection', text: i.text })),
          })),
        }}
      />

      <div className="container" style={{ padding: '48px 24px', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>DPDP Compliance Checklist</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Track your organization's progress toward full DPDP Act compliance
        </p>

        <div className="card" style={{ marginBottom: '32px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Overall Progress</span>
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{checkedCount}/{totalItems} completed ({progress}%)</span>
          </div>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
            <div style={{
              width: `${progress}%`, height: '100%', borderRadius: '4px',
              background: progress === 100 ? 'var(--success)' : progress >= 60 ? 'var(--gold)' : 'var(--warning)',
              transition: 'width 0.3s',
            }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {checklistSections.map(section => {
            const pct = getSectionProgress(section)
            return (
              <div key={section.title} className="card" style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: pct === 100 ? 'var(--success)' : pct >= 50 ? 'var(--gold)' : 'var(--warning)' }}>
                  {pct}%
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{section.title}</div>
              </div>
            )
          })}
        </div>

        {checklistSections.map(section => (
          <div key={section.title} style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--gold)' }}>{section.title}</h3>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {section.items.filter(i => checked[i.id]).length}/{section.items.length}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {section.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className="card"
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '12px', textAlign: 'left',
                    padding: '14px 16px', cursor: 'pointer', border: 'none',
                    background: checked[item.id] ? 'rgba(34, 197, 94, 0.08)' : 'var(--bg-card)',
                    opacity: checked[item.id] ? 0.7 : 1,
                  }}
                >
                  <span style={{
                    width: '20px', height: '20px', borderRadius: '4px', flexShrink: 0, marginTop: '2px',
                    border: `2px solid ${checked[item.id] ? 'var(--success)' : 'var(--border)'}`,
                    background: checked[item.id] ? 'var(--success)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: '12px',
                  }}>
                    {checked[item.id] && '✓'}
                  </span>
                  <span style={{
                    fontSize: '14px', color: 'var(--text-primary)',
                    textDecoration: checked[item.id] ? 'line-through' : 'none',
                  }}>
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div style={{ marginTop: '32px' }}>
          <ShareButtons title="DPDP Compliance Checklist" text="Track your DPDP Act compliance progress with this free interactive checklist!" />
        </div>
      </div>
    </>
  )
}

export default ComplianceChecklist
