import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import ShareButtons from '../components/ShareButtons'

const deadlines = [
  { label: 'Consent Manager Registration', date: new Date('2026-11-14T00:00:00+05:30'), description: 'Deadline for consent managers to register with the Data Protection Board of India' },
  { label: 'Core DPDP Obligations', date: new Date('2027-05-14T00:00:00+05:30'), description: 'Deadline for all Data Fiduciaries to comply with core DPDP Act obligations' },
]

function getTimeRemaining(targetDate) {
  const now = new Date()
  const diff = targetDate - now
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  }
}

function CountdownTimer({ deadline }) {
  const [time, setTime] = useState(() => getTimeRemaining(deadline.date))

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeRemaining(deadline.date)), 1000)
    return () => clearInterval(interval)
  }, [deadline.date])

  const unitStyle = {
    textAlign: 'center',
    padding: '16px 20px',
    background: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-sm)',
    minWidth: '80px',
  }

  const urgencyColor = time.days < 90 ? 'var(--danger)' : time.days < 180 ? 'var(--warning)' : 'var(--gold)'

  return (
    <div className="card" style={{ padding: '32px', marginBottom: '24px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: urgencyColor }}>{deadline.label}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>{deadline.description}</p>
      <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
        Deadline: {deadline.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
      {time.expired ? (
        <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--danger)' }}>DEADLINE PASSED</div>
      ) : (
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { val: time.days, unit: 'Days' },
            { val: time.hours, unit: 'Hours' },
            { val: time.minutes, unit: 'Minutes' },
            { val: time.seconds, unit: 'Seconds' },
          ].map(u => (
            <div key={u.unit} style={unitStyle}>
              <div style={{ fontSize: '36px', fontWeight: 800, color: urgencyColor }}>{String(u.val).padStart(2, '0')}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{u.unit}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Countdown() {
  return (
    <>
      <Helmet>
        <title>DPDP Act Deadline Countdown — DoAide DPDP</title>
        <meta name="description" content="Countdown to DPDP Act compliance deadlines: Nov 14, 2026 for consent managers and May 14, 2027 for core obligations." />
      </Helmet>

      <div className="container" style={{ padding: '48px 24px', maxWidth: '700px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>DPDP Act Deadline Countdown</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', textAlign: 'center' }}>
          Time is running out. Are you ready?
        </p>

        {deadlines.map(d => <CountdownTimer key={d.label} deadline={d} />)}

        <div className="card" style={{ marginTop: '32px', padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Key Milestones</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { date: 'Aug 11, 2023', event: 'DPDP Act, 2023 received Presidential assent' },
              { date: 'Nov 14, 2026', event: 'Consent Manager registration deadline' },
              { date: 'May 14, 2027', event: 'Core obligations take full effect' },
            ].map(m => (
              <div key={m.event} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '13px', color: 'var(--gold)', fontWeight: 600, whiteSpace: 'nowrap', minWidth: '110px' }}>{m.date}</span>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{m.event}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '32px' }}>
          <ShareButtons title="DPDP Act Deadline Countdown" text="The DPDP Act deadline is approaching! Check the countdown and prepare your business." />
        </div>
      </div>
    </>
  )
}

export default Countdown
