function ShareButtons({ title, text, url }) {
  const shareUrl = url || window.location.href
  const shareText = text || title || 'Check out this DPDP compliance tool'

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`

  const btnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '13px',
    fontWeight: 500,
    border: '1px solid var(--border)',
    background: 'var(--bg-card)',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    transition: 'all 0.2s',
  }

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ ...btnStyle, color: '#25d366' }}>
        WhatsApp
      </a>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" style={{ ...btnStyle, color: '#1da1f2' }}>
        Twitter
      </a>
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ ...btnStyle, color: '#0077b5' }}>
        LinkedIn
      </a>
    </div>
  )
}

export default ShareButtons
