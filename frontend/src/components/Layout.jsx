import { Link, Outlet, useLocation } from 'react-router-dom'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/tools', label: 'Free Tools' },
  { path: '/dpdp-act', label: 'DPDP Act' },
  { path: '/blog', label: 'Blog' },
]

function Layout() {
  const location = useLocation()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{
        borderBottom: '1px solid var(--border)',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--da-teal)' }}>DoAide</span>
            <span style={{ color: 'var(--da-text-muted)', fontSize: '24px', fontWeight: 300 }}>|</span>
            <span style={{
              background: 'var(--da-teal)',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '4px',
            }}>DPDP</span>
          </Link>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: location.pathname === link.path ? 'var(--da-teal)' : 'var(--text-secondary)',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/tools/compliance-score" className="btn-primary" style={{ padding: '8px 20px', fontSize: '14px' }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '48px 0 24px',
        marginTop: '80px',
        background: 'var(--bg-secondary)',
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
            <div>
              <h4 style={{ color: 'var(--da-teal)', marginBottom: '16px' }}>DoAide | DPDP</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                India's most comprehensive DPDP Act compliance toolkit. Be ready before the deadline.
              </p>
              <span style={{
                display: 'inline-block',
                marginTop: '12px',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--da-teal)',
                background: 'var(--da-teal-light)',
                padding: '3px 10px',
                borderRadius: '4px',
              }}>A DoAide Product</span>
            </div>
            <div>
              <h4 style={{ marginBottom: '16px', fontSize: '14px' }}>Free Tools</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link to="/tools/readiness-assessment" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Readiness Assessment</Link>
                <Link to="/tools/compliance-score" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Compliance Score</Link>
                <Link to="/tools/privacy-policy" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Privacy Policy Generator</Link>
                <Link to="/tools/consent-notice" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Consent Notice Builder</Link>
                <Link to="/tools/dpa-generator" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>DPA Generator</Link>
                <Link to="/tools/dsr-handler" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>DSR Handler</Link>
                <Link to="/tools/breach-checklist" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Breach Checklist</Link>
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: '16px', fontSize: '14px' }}>Resources</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link to="/dpdp-act" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>DPDP Act Guide</Link>
                <Link to="/tools/compliance-checklist" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Compliance Checklist</Link>
                <Link to="/blog" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Blog</Link>
                <Link to="/tools/countdown" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Deadline Countdown</Link>
                <Link to="/embed" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Embed Widget</Link>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                &copy; {new Date().getFullYear()} DoAide. Part of the DoAide suite of 26+ products.
              </p>
              <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
                <a href="https://doaide.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}>doaide.com</a>
                <a href="https://doaide.com/products" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}>All Products</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
