import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const freeTools = [
  { title: 'DPDP Compliance Score Calculator', desc: 'Answer 20 questions across 7 compliance areas and get an instant score with actionable recommendations.', path: '/tools/compliance-score' },
  { title: 'Compliance Checklist', desc: 'Track your organization\'s DPDP compliance progress across all requirements with this interactive checklist.', path: '/tools/compliance-checklist' },
  { title: 'Privacy Policy Generator', desc: 'Generate a DPDP Act-compliant privacy policy for your business. Download as HTML.', path: '/tools/privacy-policy' },
  { title: 'Consent Notice Builder', desc: 'Create DPDP-compliant consent notices with all required elements.', path: '/tools/consent-notice' },
  { title: 'Consent Widget Generator', desc: 'Generate an embeddable DPDP-compliant consent banner with granular controls. Supports English and Hindi.', path: '/tools/consent-widget' },
  { title: 'Data Processing Agreement Generator', desc: 'Generate DPDP-compliant data processing agreements between data fiduciaries and processors.', path: '/tools/dpa-generator' },
  { title: 'Data Subject Request Handler', desc: 'Generate response templates for data access, correction, erasure, and nomination requests.', path: '/tools/dsr-handler' },
  { title: 'Data Breach Response Checklist', desc: 'Step-by-step checklist for the mandatory 72-hour breach notification process.', path: '/tools/breach-checklist' },
  { title: 'DPDP Deadline Countdown', desc: 'Visual countdown to the Nov 2026 and May 2027 DPDP Act deadlines.', path: '/tools/countdown' },
]

const premiumTools = [
  { title: 'AI-Powered Policy Generation', desc: 'Business-specific customization with AI for industry-tailored policies.' },
  { title: 'Data Flow Mapping', desc: 'Visual mapping of personal data flows across your organization.' },
  { title: 'Vendor Compliance Tracker', desc: 'Track and manage third-party vendor compliance status.' },
  { title: 'Compliance Dashboard', desc: 'Centralized dashboard with action items and progress tracking.' },
]

function Tools() {
  return (
    <>
      <Helmet>
        <title>Free DPDP Compliance Tools — DoAide DPDP</title>
        <meta name="description" content="9 free tools for DPDP Act compliance: compliance score, privacy policy generator, consent builder, DPA generator, DSR handler, breach checklist, and more." />
      </Helmet>

      <div className="container" style={{ padding: '48px 24px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '8px' }}>Free DPDP Compliance Tools</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '16px' }}>
          Everything you need to start your DPDP Act compliance journey — completely free.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {freeTools.map(tool => (
            <Link key={tool.path} to={tool.path} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ height: '100%' }}>
                <span className="badge badge-free" style={{ marginBottom: '12px' }}>Free</span>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {tool.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Premium Tools</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '16px' }}>
          Advanced tools for comprehensive compliance management. Coming soon.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {premiumTools.map(tool => (
            <div key={tool.title} className="card" style={{ opacity: 0.7 }}>
              <span className="badge badge-premium" style={{ marginBottom: '12px' }}>Premium</span>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{tool.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Tools
