import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ShareButtons from '../components/ShareButtons'

const checklistItems = [
  {
    phase: 'Immediate (0-6 hours)',
    items: [
      { id: 1, text: 'Confirm the breach — verify it is a genuine data breach, not a false alarm' },
      { id: 2, text: 'Activate your incident response team and brief key stakeholders' },
      { id: 3, text: 'Contain the breach — isolate affected systems, revoke compromised credentials' },
      { id: 4, text: 'Preserve evidence — take snapshots, save logs, do not alter affected systems' },
      { id: 5, text: 'Assess initial scope — what data was affected, how many individuals' },
    ],
  },
  {
    phase: 'Assessment (6-24 hours)',
    items: [
      { id: 6, text: 'Identify categories of personal data affected (names, financial, health, Aadhaar, etc.)' },
      { id: 7, text: 'Determine the number of Data Principals (individuals) affected' },
      { id: 8, text: 'Assess the severity and potential impact on affected individuals' },
      { id: 9, text: 'Identify the root cause and attack vector' },
      { id: 10, text: 'Document all findings in a breach incident report' },
    ],
  },
  {
    phase: 'Notification (24-72 hours)',
    items: [
      { id: 11, text: 'Prepare notification to the Data Protection Board of India (DPBI) — Section 8(6) of DPDP Act' },
      { id: 12, text: 'Include in DPBI notification: nature of breach, data affected, number of individuals, remedial actions' },
      { id: 13, text: 'Submit notification to DPBI within 72 hours of becoming aware of the breach' },
      { id: 14, text: 'Notify affected Data Principals in the prescribed manner' },
      { id: 15, text: 'Include in individual notification: nature of breach, potential consequences, remedial actions, contact for queries' },
    ],
  },
  {
    phase: 'Remediation (72+ hours)',
    items: [
      { id: 16, text: 'Implement technical fixes to prevent recurrence' },
      { id: 17, text: 'Review and update security measures and access controls' },
      { id: 18, text: 'Conduct a post-incident review with all stakeholders' },
      { id: 19, text: 'Update your breach response plan based on lessons learned' },
      { id: 20, text: 'Maintain complete records of the breach and response for compliance audit' },
    ],
  },
]

function BreachChecklist() {
  const [checked, setChecked] = useState({})

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }))

  const totalItems = checklistItems.reduce((sum, phase) => sum + phase.items.length, 0)
  const checkedCount = Object.values(checked).filter(Boolean).length
  const progress = Math.round((checkedCount / totalItems) * 100)

  return (
    <>
      <Helmet>
        <title>Data Breach Response Checklist — DoAide DPDP</title>
        <meta name="description" content="Step-by-step checklist for the mandatory 72-hour data breach notification under India's DPDP Act. Free downloadable guide." />
      </Helmet>

      <div className="container" style={{ padding: '48px 24px', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Data Breach Response Checklist</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          72-hour breach notification guide under the DPDP Act, 2023
        </p>

        <div className="card" style={{ marginBottom: '32px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Progress</span>
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{checkedCount}/{totalItems} completed</span>
          </div>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
            <div style={{
              width: `${progress}%`, height: '100%', borderRadius: '4px',
              background: progress === 100 ? 'var(--success)' : 'var(--gold)',
              transition: 'width 0.3s',
            }} />
          </div>
        </div>

        {checklistItems.map(phase => (
          <div key={phase.phase} style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: 'var(--gold)' }}>
              {phase.phase}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {phase.items.map(item => (
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
          <ShareButtons title="DPDP Data Breach Response Checklist" text="72-hour breach notification checklist for DPDP Act compliance — get yours free!" />
        </div>
      </div>
    </>
  )
}

export default BreachChecklist
