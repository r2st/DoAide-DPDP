import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import JsonLd from '../components/JsonLd'

const tools = [
  { title: 'DPDP Compliance Score', desc: 'Answer 20 questions, get your instant compliance score', path: '/tools/compliance-score', badge: 'Free' },
  { title: 'Privacy Policy Generator', desc: 'Generate a DPDP-compliant privacy policy in minutes', path: '/tools/privacy-policy', badge: 'Free' },
  { title: 'Consent Notice Builder', desc: 'Build DPDP-compliant consent forms for your app', path: '/tools/consent-notice', badge: 'Free' },
  { title: 'Data Breach Checklist', desc: 'Step-by-step guide for 72-hour breach notification', path: '/tools/breach-checklist', badge: 'Free' },
  { title: 'Deadline Countdown', desc: 'Visual countdown to DPDP Act deadlines', path: '/tools/countdown', badge: 'Free' },
]

const stats = [
  { value: '80%', label: 'of businesses haven\'t updated privacy policies' },
  { value: 'Nov 2026', label: 'Consent manager deadline' },
  { value: 'May 2027', label: 'Core obligations deadline' },
  { value: '₹250 Cr', label: 'Maximum penalty for non-compliance' },
]

function Home() {
  return (
    <>
      <Helmet>
        <title>DoAide DPDP — India's DPDP Act Compliance Toolkit</title>
        <meta name="description" content="Free tools to help Indian businesses comply with the Digital Personal Data Protection Act 2023. Check your compliance score, generate privacy policies, and more." />
      </Helmet>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'DoAide DPDP',
        description: 'India\'s DPDP Act compliance toolkit',
        applicationCategory: 'BusinessApplication',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      }} />

      <section style={{ padding: '80px 0 60px', textAlign: 'center' }}>
        <div className="container">
          <div style={{
            display: 'inline-block',
            background: 'rgba(239, 68, 68, 0.15)',
            color: 'var(--danger)',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '24px',
          }}>
            Nov 2026 deadline approaching. 80% of businesses aren't ready.
          </div>
          <h1 style={{ fontSize: '52px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '20px', maxWidth: '800px', margin: '0 auto 20px' }}>
            Is Your Business <span style={{ color: 'var(--gold)' }}>DPDP Ready</span>?
          </h1>
          <h2 style={{ fontSize: '52px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '24px' }}>
            Check Now — <span style={{ color: 'var(--success)' }}>Free</span>
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px' }}>
            India's Digital Personal Data Protection Act is here. Use our free tools to assess your compliance,
            generate required documents, and get ready before the deadline.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/tools/compliance-score" className="btn-primary" style={{ fontSize: '18px', padding: '16px 40px' }}>
              Check Your Compliance Score
            </Link>
            <Link to="/tools" className="btn-secondary" style={{ fontSize: '18px', padding: '16px 40px' }}>
              Explore Free Tools
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 0 60px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {stats.map(stat => (
              <div key={stat.label} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--gold)', marginBottom: '8px' }}>{stat.value}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: 700, textAlign: 'center', marginBottom: '40px' }}>
            Free Compliance Tools
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {tools.map(tool => (
              <Link key={tool.path} to={tool.path} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ height: '100%' }}>
                  <span className="badge badge-free" style={{ marginBottom: '12px' }}>{tool.badge}</span>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
                    {tool.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>
            Premium Compliance Suite
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            For businesses that need comprehensive compliance management
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
            {[
              'AI-Powered Policy Generation',
              'Data Flow Mapping Tool',
              'Vendor Compliance Tracker',
              'Compliance Dashboard',
            ].map(feature => (
              <div key={feature} className="card" style={{ textAlign: 'left' }}>
                <span className="badge badge-premium" style={{ marginBottom: '8px' }}>Premium</span>
                <p style={{ fontWeight: 500 }}>{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
