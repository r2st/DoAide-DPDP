import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ShareButtons from '../components/ShareButtons'
import JsonLd from '../components/JsonLd'

const questions = [
  { id: 'q1', question: 'Do you obtain explicit consent before collecting personal data?', category: 'Consent Management', options: [{ value: 0, label: 'No consent mechanism exists' }, { value: 1, label: 'Implied consent only (e.g., buried in T&C)' }, { value: 2, label: 'Basic consent form exists but not DPDP-compliant' }, { value: 3, label: 'Clear, specific, informed consent with opt-in' }] },
  { id: 'q2', question: 'Is your consent notice in clear, plain language?', category: 'Consent Management', options: [{ value: 0, label: 'No consent notice' }, { value: 1, label: 'Legal jargon, difficult to understand' }, { value: 2, label: 'Somewhat clear but could be improved' }, { value: 3, label: 'Clear, plain language, easily understandable' }] },
  { id: 'q3', question: 'Can users withdraw consent easily?', category: 'Consent Management', options: [{ value: 0, label: 'No withdrawal mechanism' }, { value: 1, label: 'Difficult process (e.g., email-only)' }, { value: 2, label: 'Possible but not straightforward' }, { value: 3, label: 'Easy one-click withdrawal available' }] },
  { id: 'q4', question: 'Do you specify the purpose of data collection in your consent notice?', category: 'Consent Management', options: [{ value: 0, label: 'No purpose specified' }, { value: 1, label: 'Vague or generic purposes' }, { value: 2, label: 'Some purposes specified' }, { value: 3, label: 'All purposes clearly specified and itemized' }] },
  { id: 'q5', question: 'Can Data Principals access a summary of their personal data?', category: 'Data Principal Rights', options: [{ value: 0, label: 'No access mechanism' }, { value: 1, label: 'Manual request process only' }, { value: 2, label: 'Partial self-service access' }, { value: 3, label: 'Full self-service dashboard with data summary' }] },
  { id: 'q6', question: 'Can users request correction of their personal data?', category: 'Data Principal Rights', options: [{ value: 0, label: 'No correction mechanism' }, { value: 1, label: 'Email-based correction requests' }, { value: 2, label: 'Form-based correction with manual processing' }, { value: 3, label: 'Self-service correction with immediate effect' }] },
  { id: 'q7', question: 'Can users request erasure of their personal data?', category: 'Data Principal Rights', options: [{ value: 0, label: 'No erasure mechanism' }, { value: 1, label: 'Request-based with no guaranteed timeline' }, { value: 2, label: 'Formal process with defined timeline' }, { value: 3, label: 'Automated erasure with confirmation' }] },
  { id: 'q8', question: 'Do you have a nomination mechanism for Data Principals?', category: 'Data Principal Rights', options: [{ value: 0, label: 'No nomination mechanism' }, { value: 1, label: 'Aware but not implemented' }, { value: 2, label: 'Basic nomination process exists' }, { value: 3, label: 'Full nomination mechanism as per DPDP Act' }] },
  { id: 'q9', question: 'Have you appointed a Data Protection Officer (DPO)?', category: 'Data Protection Officer', options: [{ value: 0, label: 'No DPO appointed' }, { value: 1, label: 'Someone handles it part-time informally' }, { value: 2, label: 'Designated person but no formal appointment' }, { value: 3, label: 'Formally appointed DPO with published contact details' }] },
  { id: 'q10', question: 'Do you have a grievance redressal mechanism?', category: 'Data Protection Officer', options: [{ value: 0, label: 'No grievance mechanism' }, { value: 1, label: 'Generic customer support only' }, { value: 2, label: 'Dedicated email for data-related grievances' }, { value: 3, label: 'Formal grievance officer with SLA' }] },
  { id: 'q11', question: 'Do you have a data breach response plan?', category: 'Data Breach Procedures', options: [{ value: 0, label: 'No breach response plan' }, { value: 1, label: 'Informal understanding of what to do' }, { value: 2, label: 'Documented plan but not tested' }, { value: 3, label: 'Documented, tested, and regularly updated plan' }] },
  { id: 'q12', question: 'Can you notify the Data Protection Board within 72 hours?', category: 'Data Breach Procedures', options: [{ value: 0, label: 'No notification process exists' }, { value: 1, label: 'Would take more than 72 hours' }, { value: 2, label: 'Possible but not guaranteed' }, { value: 3, label: 'Yes, process and templates are ready' }] },
  { id: 'q13', question: 'Can you notify affected Data Principals promptly?', category: 'Data Breach Procedures', options: [{ value: 0, label: 'No mechanism to contact affected individuals' }, { value: 1, label: 'Manual process, would take significant time' }, { value: 2, label: 'Semi-automated notification possible' }, { value: 3, label: 'Automated notification system with templates ready' }] },
  { id: 'q14', question: 'Do you process children\'s (under 18) personal data?', category: "Children's Data", options: [{ value: 3, label: 'No, we do not process children\'s data' }, { value: 0, label: 'Yes, without parental consent mechanisms' }, { value: 1, label: 'Yes, with basic age verification' }, { value: 2, label: 'Yes, with verifiable parental consent' }] },
  { id: 'q15', question: 'Do you avoid tracking/behavioural monitoring of children?', category: "Children's Data", options: [{ value: 3, label: 'Not applicable (no children\'s data)' }, { value: 0, label: 'We track children\'s behaviour' }, { value: 2, label: 'Limited tracking with parental consent' }, { value: 3, label: 'No tracking or behavioural monitoring of children' }] },
  { id: 'q16', question: 'Do you transfer personal data outside India?', category: 'Cross-Border Transfers', options: [{ value: 3, label: 'No cross-border transfers' }, { value: 0, label: 'Yes, to any country without checks' }, { value: 1, label: 'Yes, but unsure about DPDP compliance' }, { value: 3, label: 'Yes, only to government-approved countries' }] },
  { id: 'q17', question: 'Do you maintain records of cross-border data transfers?', category: 'Cross-Border Transfers', options: [{ value: 3, label: 'Not applicable' }, { value: 0, label: 'No records maintained' }, { value: 1, label: 'Partial records' }, { value: 3, label: 'Complete records with legal basis documented' }] },
  { id: 'q18', question: 'Do you have a defined data retention policy?', category: 'Data Retention & Processing', options: [{ value: 0, label: 'No retention policy' }, { value: 1, label: 'Informal understanding, not documented' }, { value: 2, label: 'Documented but not consistently followed' }, { value: 3, label: 'Documented, enforced, and regularly reviewed' }] },
  { id: 'q19', question: 'Do you erase personal data when no longer needed?', category: 'Data Retention & Processing', options: [{ value: 0, label: 'Data is never deleted' }, { value: 1, label: 'Deleted on request only' }, { value: 2, label: 'Periodic cleanup but not systematic' }, { value: 3, label: 'Automated erasure based on retention schedule' }] },
  { id: 'q20', question: 'Do you maintain records of data processing activities?', category: 'Data Retention & Processing', options: [{ value: 0, label: 'No records maintained' }, { value: 1, label: 'Basic spreadsheet or informal tracking' }, { value: 2, label: 'Documented but incomplete' }, { value: 3, label: 'Comprehensive, up-to-date processing records' }] },
]

const categoryColors = {
  Critical: 'var(--danger)',
  'Needs Work': 'var(--warning)',
  Progressing: 'var(--info)',
  Good: 'var(--success)',
  Excellent: 'var(--success)',
}

function ComplianceScore() {
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [currentQ, setCurrentQ] = useState(0)

  const handleAnswer = (qid, value) => {
    setAnswers(prev => ({ ...prev, [qid]: value }))
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1)
    }
  }

  const calculateScore = () => {
    const totalMax = questions.length * 3
    let total = 0
    const categories = {}

    questions.forEach(q => {
      const val = answers[q.id] ?? 0
      total += val
      if (!categories[q.category]) categories[q.category] = { earned: 0, max: 0 }
      categories[q.category].earned += val
      categories[q.category].max += 3
    })

    const score = Math.round((total / totalMax) * 100)
    let category
    if (score <= 30) category = 'Critical'
    else if (score <= 50) category = 'Needs Work'
    else if (score <= 70) category = 'Progressing'
    else if (score <= 85) category = 'Good'
    else category = 'Excellent'

    const breakdown = {}
    Object.entries(categories).forEach(([cat, vals]) => {
      breakdown[cat] = { ...vals, percentage: Math.round((vals.earned / vals.max) * 100) }
    })

    setResult({ score, category, breakdown })
  }

  const answeredCount = Object.keys(answers).length

  if (result) {
    return (
      <>
        <Helmet>
          <title>Your DPDP Compliance Score — DoAide DPDP</title>
        </Helmet>
        <div className="container" style={{ padding: '48px 24px', maxWidth: '700px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', textAlign: 'center' }}>Your DPDP Compliance Score</h1>

          <div className="card" style={{ textAlign: 'center', marginBottom: '32px', padding: '40px' }}>
            <div style={{
              width: '160px', height: '160px', borderRadius: '50%', margin: '0 auto 20px',
              border: `6px solid ${categoryColors[result.category]}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
            }}>
              <span style={{ fontSize: '48px', fontWeight: 800, color: categoryColors[result.category] }}>{result.score}</span>
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>/ 100</span>
            </div>
            <div style={{
              display: 'inline-block', padding: '6px 20px', borderRadius: '20px',
              background: categoryColors[result.category] + '22', color: categoryColors[result.category],
              fontWeight: 600, fontSize: '16px',
            }}>
              {result.category}
            </div>
          </div>

          <h3 style={{ marginBottom: '16px' }}>Breakdown by Area</h3>
          {Object.entries(result.breakdown).map(([cat, vals]) => (
            <div key={cat} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px' }}>{cat}</span>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{vals.percentage}%</span>
              </div>
              <div style={{ background: 'var(--bg-secondary)', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                <div style={{
                  width: `${vals.percentage}%`, height: '100%', borderRadius: '4px',
                  background: vals.percentage >= 70 ? 'var(--success)' : vals.percentage >= 40 ? 'var(--warning)' : 'var(--danger)',
                  transition: 'width 0.5s ease',
                }} />
              </div>
            </div>
          ))}

          <div style={{ marginTop: '32px' }}>
            <ShareButtons title={`My DPDP Compliance Score: ${result.score}/100 (${result.category})`} text={`I scored ${result.score}/100 on the DPDP compliance assessment. Check yours!`} />
          </div>

          <button className="btn-secondary" style={{ marginTop: '24px', width: '100%' }} onClick={() => { setResult(null); setAnswers({}); setCurrentQ(0) }}>
            Retake Assessment
          </button>
        </div>
      </>
    )
  }

  const q = questions[currentQ]

  return (
    <>
      <Helmet>
        <title>DPDP Compliance Score Calculator — DoAide DPDP</title>
        <meta name="description" content="Answer 20 questions to get your instant DPDP compliance score. Free assessment covering consent, data rights, breach procedures, and more." />
      </Helmet>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Quiz', name: 'DPDP Compliance Score Calculator', description: 'Assess your readiness for India\'s DPDP Act' }} />

      <div className="container" style={{ padding: '48px 24px', maxWidth: '700px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>DPDP Compliance Score Calculator</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Answer 20 questions to get your instant compliance score
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Question {currentQ + 1} of {questions.length}
          </span>
          <span className="badge" style={{ background: 'var(--gold-light)', color: 'var(--gold)' }}>{q.category}</span>
        </div>

        <div style={{ background: 'var(--bg-secondary)', borderRadius: '4px', height: '4px', marginBottom: '32px' }}>
          <div style={{ width: `${((currentQ + 1) / questions.length) * 100}%`, height: '100%', background: 'var(--gold)', borderRadius: '4px', transition: 'width 0.3s' }} />
        </div>

        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>{q.question}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(q.id, opt.value)}
                style={{
                  textAlign: 'left', padding: '14px 16px', borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${answers[q.id] === opt.value ? 'var(--gold)' : 'var(--border)'}`,
                  background: answers[q.id] === opt.value ? 'var(--gold-light)' : 'var(--bg-secondary)',
                  color: 'var(--text-primary)', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {currentQ > 0 && (
            <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setCurrentQ(currentQ - 1)}>Previous</button>
          )}
          {currentQ < questions.length - 1 ? (
            <button className="btn-primary" style={{ flex: 1 }} onClick={() => setCurrentQ(currentQ + 1)} disabled={!answers[q.id] && answers[q.id] !== 0}>
              Next
            </button>
          ) : (
            <button className="btn-primary" style={{ flex: 1 }} onClick={calculateScore} disabled={answeredCount < questions.length}>
              Get My Score ({answeredCount}/{questions.length} answered)
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default ComplianceScore
