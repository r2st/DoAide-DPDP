import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import JsonLd from '../components/JsonLd'

const tools = [
  { title: 'DPDP Compliance Score', desc: 'Answer 20 questions, get your instant compliance score', path: '/tools/compliance-score', badge: 'Free' },
  { title: 'Readiness Assessment', desc: 'Quick 2-minute checklist — no login, instant results', path: '/tools/readiness-assessment', badge: 'Free' },
  { title: 'Compliance Checklist', desc: 'Track your DPDP compliance progress across all requirements', path: '/tools/compliance-checklist', badge: 'Free' },
  { title: 'Privacy Policy Generator', desc: 'Generate a DPDP-compliant privacy policy in minutes', path: '/tools/privacy-policy', badge: 'Free' },
  { title: 'Consent Notice Builder', desc: 'Build DPDP-compliant consent forms for your app', path: '/tools/consent-notice', badge: 'Free' },
  { title: 'Consent Widget Generator', desc: 'Embeddable consent banner with granular controls', path: '/tools/consent-widget', badge: 'Free' },
  { title: 'DPA Generator', desc: 'Data Processing Agreements for controllers and processors', path: '/tools/dpa-generator', badge: 'Free' },
  { title: 'DSR Handler', desc: 'Response templates for data access, correction & erasure requests', path: '/tools/dsr-handler', badge: 'Free' },
  { title: 'Data Breach Checklist', desc: 'Step-by-step guide for 72-hour breach notification', path: '/tools/breach-checklist', badge: 'Free' },
  { title: 'Deadline Countdown', desc: 'Visual countdown to DPDP Act deadlines', path: '/tools/countdown', badge: 'Free' },
]

const stats = [
  { value: '80%', label: 'of businesses haven\'t updated privacy policies' },
  { value: 'Nov 2026', label: 'Consent manager deadline' },
  { value: 'May 2027', label: 'Core obligations deadline' },
  { value: '₹250 Cr', label: 'Maximum penalty for non-compliance' },
]

const testimonials = [
  {
    quote: 'The compliance score tool gave us a clear picture of where we stood. We identified 5 critical gaps we didn\'t know we had.',
    author: 'Rajesh K.',
    role: 'CTO, E-commerce Startup',
    location: 'Bengaluru',
  },
  {
    quote: 'Generated our privacy policy in under 10 minutes. Our legal team reviewed it and said it covered all the DPDP requirements.',
    author: 'Priya M.',
    role: 'Head of Legal, SaaS Company',
    location: 'Mumbai',
  },
  {
    quote: 'The consent widget generator saved us weeks of development. We embedded it on our site and were DPDP-compliant the same day.',
    author: 'Amit S.',
    role: 'Founder, HealthTech Platform',
    location: 'Delhi NCR',
  },
  {
    quote: 'As a small business owner, I had no idea where to start with DPDP. The readiness checklist broke it down into simple steps.',
    author: 'Sneha D.',
    role: 'Owner, Online Retail Store',
    location: 'Pune',
  },
]

const steps = [
  { num: '1', title: 'Assess Your Readiness', desc: 'Take our free 2-minute assessment to understand your current compliance posture.', link: '/tools/readiness-assessment', cta: 'Start Assessment' },
  { num: '2', title: 'Identify Gaps', desc: 'Get a detailed breakdown of compliance gaps across consent, security, governance, and more.', link: '/tools/compliance-score', cta: 'Check Score' },
  { num: '3', title: 'Generate Documents', desc: 'Use our free generators to create privacy policies, consent notices, and DPAs.', link: '/tools', cta: 'Use Free Tools' },
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
        description: 'India\'s DPDP Act compliance toolkit with 10 free tools',
        applicationCategory: 'BusinessApplication',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        url: 'https://dpdp.doaide.com',
      }} />

      {/* Hero */}
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
            Find Out in <span style={{ color: 'var(--success)' }}>2 Minutes</span> — Free
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px' }}>
            India's Digital Personal Data Protection Act is here. Use our free tools to assess your compliance,
            generate required documents, and get ready before the deadline.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/tools/readiness-assessment" className="btn-primary" style={{ fontSize: '18px', padding: '16px 40px' }}>
              Take Free Readiness Assessment
            </Link>
            <Link to="/tools" className="btn-secondary" style={{ fontSize: '18px', padding: '16px 40px' }}>
              Explore All 10 Free Tools
            </Link>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '16px' }}>
            No login required. No email needed. 100% free.
          </p>
        </div>
      </section>

      {/* Stats */}
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

      {/* How It Works */}
      <section style={{ padding: '60px 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: 700, textAlign: 'center', marginBottom: '16px' }}>
            Get Compliant in 3 Steps
          </h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Start your compliance journey today — it takes less than 10 minutes to get started.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {steps.map(step => (
              <div key={step.num} className="card" style={{ textAlign: 'center', padding: '32px 24px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gold)',
                  color: '#000', fontSize: '20px', fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>{step.desc}</p>
                <Link to={step.link} style={{ fontSize: '14px', fontWeight: 600 }}>{step.cta} &rarr;</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: 700, textAlign: 'center', marginBottom: '40px' }}>
            10 Free Compliance Tools
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

      {/* Testimonials */}
      <section style={{ padding: '60px 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 style={{ fontSize: '36px', fontWeight: 700, textAlign: 'center', marginBottom: '16px' }}>
            Trusted by Indian Businesses
          </h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px' }}>
            See how businesses across India are using DoAide DPDP to prepare for compliance
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {testimonials.map(t => (
              <div key={t.author} className="card" style={{ padding: '28px' }}>
                <div style={{ fontSize: '24px', color: 'var(--gold)', marginBottom: '12px' }}>&ldquo;</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px', fontStyle: 'italic' }}>
                  {t.quote}
                </p>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{t.author}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{t.role}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium */}
      <section style={{ padding: '60px 0' }}>
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

      {/* Final CTA */}
      <section style={{ padding: '60px 0', background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>
            Don't Wait Until the Deadline
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 32px', fontSize: '16px' }}>
            Penalties under the DPDP Act go up to ₹250 Crore. Start your compliance journey now — it's free.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/tools/readiness-assessment" className="btn-primary" style={{ fontSize: '18px', padding: '16px 40px' }}>
              Take Free Assessment Now
            </Link>
            <Link to="/blog" className="btn-secondary" style={{ fontSize: '18px', padding: '16px 40px' }}>
              Read DPDP Guides
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
