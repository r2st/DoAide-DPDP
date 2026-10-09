import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import ShareButtons from '../components/ShareButtons'

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'section-4', title: 'Section 4 — Lawful Processing' },
  { id: 'section-5', title: 'Section 5 — Notice' },
  { id: 'section-6', title: 'Section 6 — Consent' },
  { id: 'section-7', title: 'Section 7 — Legitimate Uses' },
  { id: 'section-8', title: 'Section 8 — Data Fiduciary Obligations' },
  { id: 'section-9', title: "Section 9 — Children's Data" },
  { id: 'section-10', title: 'Section 10 — Significant Data Fiduciaries' },
  { id: 'sections-11-14', title: 'Sections 11–14 — Data Principal Rights' },
  { id: 'section-15', title: 'Section 15 — Data Protection Board' },
  { id: 'section-16', title: 'Section 16 — Cross-Border Transfers' },
  { id: 'section-33', title: 'Section 33 — Penalties' },
]

const faqItems = [
  { q: 'What is the DPDP Act?', a: 'The Digital Personal Data Protection Act, 2023 (DPDP Act) is India\'s comprehensive data protection law that governs how digital personal data is collected, processed, and stored. It received Presidential assent on August 11, 2023.' },
  { q: 'Who does the DPDP Act apply to?', a: 'The DPDP Act applies to all entities (Data Fiduciaries) that process digital personal data within India, or process data of individuals in India even if the processing happens outside the country.' },
  { q: 'What are the key deadlines for DPDP Act compliance?', a: 'November 14, 2026 is the deadline for Consent Manager registration. May 14, 2027 is when core obligations take full effect for all Data Fiduciaries.' },
  { q: 'What is the maximum penalty under the DPDP Act?', a: 'The maximum penalty is ₹250 Crore (approximately $30 million USD) for failure to take reasonable security measures leading to a data breach.' },
  { q: 'What is a Data Fiduciary under the DPDP Act?', a: 'A Data Fiduciary is any person or entity that determines the purpose and means of processing digital personal data. Essentially, if your business collects and uses personal data, you are a Data Fiduciary.' },
  { q: 'How is consent defined under the DPDP Act?', a: 'Consent under the DPDP Act must be free, specific, informed, unconditional, and unambiguous. It must be given through a clear affirmative action and can be withdrawn as easily as it was given.' },
]

const sectionStyle = { marginBottom: '48px' }
const hStyle = { fontSize: '24px', fontWeight: 700, marginBottom: '16px', paddingTop: '24px' }
const pStyle = { fontSize: '15px', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '12px' }
const listStyle = { paddingLeft: '24px', marginBottom: '16px' }
const liStyle = { fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: 1.6 }

function DPDPExplainer() {
  return (
    <>
      <SEOHead
        title="DPDP Act 2023 Explained: Section-by-Section Guide"
        description="Comprehensive guide to India's Digital Personal Data Protection Act 2023. Understand every section — consent, data rights, penalties, cross-border transfers. Free DPDP compliance guide."
        path="/dpdp-act"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map(f => ({
            '@type': 'Question', name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />

      <div className="container" style={{ padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '48px', alignItems: 'start' }}>

          <nav style={{
            position: 'sticky', top: '80px', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto',
            paddingRight: '16px', borderRight: '1px solid var(--border)',
          }}>
            <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>
              Table of Contents
            </h4>
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`} style={{
                display: 'block', fontSize: '13px', color: 'var(--text-secondary)',
                padding: '6px 0', borderLeft: '2px solid transparent',
                paddingLeft: '12px', transition: 'all 0.2s',
              }}>
                {s.title}
              </a>
            ))}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
              <Link to="/tools/compliance-score" className="btn-primary" style={{ display: 'block', textAlign: 'center', padding: '10px 16px', fontSize: '13px' }}>
                Check Your Score
              </Link>
            </div>
          </nav>

          <article style={{ maxWidth: '720px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2 }}>
              DPDP Act 2023: Section-by-Section Guide
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Everything Indian businesses need to know about the Digital Personal Data Protection Act — explained in plain language.
            </p>

            <div id="overview" style={sectionStyle}>
              <h2 style={hStyle}>Overview</h2>
              <p style={pStyle}>
                The <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> is India's first comprehensive
                data protection legislation. It received Presidential assent on <strong>August 11, 2023</strong>, and
                establishes a framework for the processing of digital personal data, balancing individuals' right to
                protect their personal data with the need for lawful processing by businesses and the government.
              </p>
              <p style={pStyle}>
                The Act introduces key concepts such as <strong>Data Fiduciary</strong> (the entity that collects and
                processes data), <strong>Data Principal</strong> (the individual whose data is being processed),
                <strong> Data Processor</strong> (processes data on behalf of a fiduciary), and <strong>Consent Manager</strong>
                (registered entity that helps Data Principals manage consent).
              </p>
              <div className="card" style={{ marginTop: '16px', padding: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Key Dates</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '13px', minWidth: '110px' }}>Aug 11, 2023</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Presidential assent received</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '13px', minWidth: '110px' }}>Nov 14, 2026</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Consent Manager registration deadline</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '13px', minWidth: '110px' }}>May 14, 2027</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Core obligations take full effect</span>
                  </div>
                </div>
              </div>
            </div>

            <div id="section-4" style={sectionStyle}>
              <h2 style={hStyle}>Section 4 — Lawful Processing</h2>
              <p style={pStyle}>
                Personal data can only be processed for a <strong>lawful purpose</strong>. This means the processing must
                either have the consent of the Data Principal or fall under one of the "legitimate uses" defined in Section 7.
              </p>
              <p style={pStyle}>
                The Act explicitly prohibits processing that is not for the specific purpose for which consent was obtained.
                If a business collects data for "service delivery" but uses it for "targeted advertising" without separate
                consent, it violates Section 4.
              </p>
            </div>

            <div id="section-5" style={sectionStyle}>
              <h2 style={hStyle}>Section 5 — Notice Requirements</h2>
              <p style={pStyle}>
                Before collecting personal data (or as soon as practicable afterward), a Data Fiduciary must provide a
                <strong> clear and plain-language notice</strong> to the Data Principal. This notice must include:
              </p>
              <ul style={listStyle}>
                <li style={liStyle}>The personal data being collected and the purpose of processing</li>
                <li style={liStyle}>How the Data Principal can exercise their rights (access, correction, erasure)</li>
                <li style={liStyle}>How to file a complaint with the Data Protection Board</li>
              </ul>
              <p style={pStyle}>
                The emphasis on "clear and plain language" is deliberate — legal jargon buried in lengthy terms of service
                does not satisfy this requirement.
              </p>
            </div>

            <div id="section-6" style={sectionStyle}>
              <h2 style={hStyle}>Section 6 — Consent</h2>
              <p style={pStyle}>
                Consent is the cornerstone of the DPDP Act. Valid consent must be:
              </p>
              <ul style={listStyle}>
                <li style={liStyle}><strong>Free:</strong> Not coerced or made a condition of unrelated services</li>
                <li style={liStyle}><strong>Specific:</strong> Given for each stated purpose, not bundled</li>
                <li style={liStyle}><strong>Informed:</strong> The Data Principal understands what they are agreeing to</li>
                <li style={liStyle}><strong>Unconditional:</strong> Not tied to conditions unrelated to the processing</li>
                <li style={liStyle}><strong>Unambiguous:</strong> A clear affirmative action (no pre-checked boxes)</li>
              </ul>
              <p style={pStyle}>
                Critically, <strong>withdrawal of consent must be as easy as giving consent</strong>. If consent is obtained
                via a single click, withdrawal should also be a single click — not a multi-step email process.
              </p>
              <div className="card" style={{ padding: '16px', background: 'rgba(240, 180, 41, 0.08)', border: '1px solid var(--gold)' }}>
                <p style={{ fontSize: '13px', color: 'var(--gold)' }}>
                  Build compliant consent notices with our <Link to="/tools/consent-notice" style={{ fontWeight: 600 }}>Consent Notice Builder</Link> or
                  generate an embeddable banner with our <Link to="/tools/consent-widget" style={{ fontWeight: 600 }}>Consent Widget Generator</Link>.
                </p>
              </div>
            </div>

            <div id="section-7" style={sectionStyle}>
              <h2 style={hStyle}>Section 7 — Legitimate Uses (Without Consent)</h2>
              <p style={pStyle}>
                The DPDP Act allows processing without explicit consent in certain scenarios:
              </p>
              <ul style={listStyle}>
                <li style={liStyle}>Voluntary provision of data for a specified purpose (and data not withdrawn)</li>
                <li style={liStyle}>State functions including subsidies, benefits, or services</li>
                <li style={liStyle}>Medical emergencies involving a threat to life or health</li>
                <li style={liStyle}>Employment purposes (existing employer-employee relationships)</li>
                <li style={liStyle}>Processing in public interest as prescribed by the Central Government</li>
                <li style={liStyle}>Compliance with judicial orders, judgments, or legal obligations</li>
              </ul>
            </div>

            <div id="section-8" style={sectionStyle}>
              <h2 style={hStyle}>Section 8 — Data Fiduciary Obligations</h2>
              <p style={pStyle}>
                Data Fiduciaries carry significant obligations under the Act:
              </p>
              <ul style={listStyle}>
                <li style={liStyle}><strong>Security:</strong> Implement reasonable security safeguards to prevent data breaches</li>
                <li style={liStyle}><strong>Breach notification:</strong> Notify the Data Protection Board and affected Data Principals of any personal data breach (Section 8(6))</li>
                <li style={liStyle}><strong>Data accuracy:</strong> Ensure personal data used for decisions is complete, accurate, and consistent</li>
                <li style={liStyle}><strong>Data retention:</strong> Erase personal data when the purpose is fulfilled and retention is no longer necessary</li>
                <li style={liStyle}><strong>Grievance redressal:</strong> Provide an accessible mechanism for Data Principals to raise complaints</li>
              </ul>
              <p style={pStyle}>
                The 72-hour breach notification requirement is particularly important. Use our <Link to="/tools/breach-checklist" style={{ color: 'var(--gold)' }}>Breach Response Checklist</Link> to prepare.
              </p>
            </div>

            <div id="section-9" style={sectionStyle}>
              <h2 style={hStyle}>Section 9 — Children's Data</h2>
              <p style={pStyle}>
                The DPDP Act provides heightened protections for children (defined as anyone under <strong>18 years</strong>):
              </p>
              <ul style={listStyle}>
                <li style={liStyle}><strong>Verifiable parental consent</strong> is required before processing any child's data</li>
                <li style={liStyle}><strong>No tracking or behavioural monitoring</strong> of children is permitted</li>
                <li style={liStyle}><strong>No targeted advertising</strong> directed at children</li>
                <li style={liStyle}>Processing that could cause <strong>detrimental effect</strong> on the child's well-being is prohibited</li>
              </ul>
              <p style={pStyle}>
                Note: The Central Government may exempt certain Data Fiduciaries from the verifiable parental consent
                requirement if the processing is verifiably safe and in the interest of the child.
              </p>
            </div>

            <div id="section-10" style={sectionStyle}>
              <h2 style={hStyle}>Section 10 — Significant Data Fiduciaries</h2>
              <p style={pStyle}>
                The Central Government may designate certain Data Fiduciaries as <strong>Significant Data Fiduciaries</strong>
                based on factors like volume and sensitivity of data processed, risk to Data Principals, and potential impact
                on India's sovereignty and integrity. These entities face additional obligations:
              </p>
              <ul style={listStyle}>
                <li style={liStyle}>Appoint a <strong>Data Protection Officer</strong> based in India</li>
                <li style={liStyle}>Appoint an <strong>independent data auditor</strong> to evaluate compliance</li>
                <li style={liStyle}>Conduct periodic <strong>Data Protection Impact Assessments</strong></li>
                <li style={liStyle}>Undertake periodic audits and publish compliance reports</li>
              </ul>
            </div>

            <div id="sections-11-14" style={sectionStyle}>
              <h2 style={hStyle}>Sections 11–14 — Data Principal Rights</h2>
              <p style={pStyle}>
                The DPDP Act grants Data Principals four key rights:
              </p>
              <ul style={listStyle}>
                <li style={liStyle}><strong>Right to Information (Section 11):</strong> Obtain a summary of personal data being processed, the processing activities, the identities of all entities with whom data has been shared, and any other prescribed information</li>
                <li style={liStyle}><strong>Right to Correction and Erasure (Section 12):</strong> Request correction of inaccurate/misleading data, completion of incomplete data, updating of outdated data, and erasure of data no longer necessary</li>
                <li style={liStyle}><strong>Right to Grievance Redressal (Section 13):</strong> Every Data Fiduciary must have a mechanism to address grievances. If unsatisfied, the Data Principal can approach the Data Protection Board</li>
                <li style={liStyle}><strong>Right to Nominate (Section 14):</strong> Nominate another individual to exercise these rights in the event of death or incapacity</li>
              </ul>
              <div className="card" style={{ padding: '16px', background: 'rgba(240, 180, 41, 0.08)', border: '1px solid var(--gold)' }}>
                <p style={{ fontSize: '13px', color: 'var(--gold)' }}>
                  Generate compliant response templates for all request types with our <Link to="/tools/dsr-handler" style={{ fontWeight: 600 }}>Data Subject Request Handler</Link>.
                </p>
              </div>
            </div>

            <div id="section-15" style={sectionStyle}>
              <h2 style={hStyle}>Section 15 — Data Protection Board of India</h2>
              <p style={pStyle}>
                The Act establishes the <strong>Data Protection Board of India (DPBI)</strong> as the adjudicatory body.
                The Board's key functions include:
              </p>
              <ul style={listStyle}>
                <li style={liStyle}>Receiving and adjudicating complaints from Data Principals</li>
                <li style={liStyle}>Investigating data breaches and non-compliance</li>
                <li style={liStyle}>Imposing penalties for violations of the Act</li>
                <li style={liStyle}>Issuing directions to Data Fiduciaries for remedial actions</li>
              </ul>
              <p style={pStyle}>
                The DPBI operates as a digital-first body — proceedings are conducted digitally, making it accessible
                across India without requiring physical presence.
              </p>
            </div>

            <div id="section-16" style={sectionStyle}>
              <h2 style={hStyle}>Section 16 — Cross-Border Data Transfers</h2>
              <p style={pStyle}>
                Personal data may be transferred outside India, <strong>except</strong> to countries or territories
                specifically restricted by the Central Government through notification. This is a "blacklist" approach
                (everything is allowed unless explicitly restricted), different from GDPR's "whitelist" approach.
              </p>
              <p style={pStyle}>
                The Central Government may also impose additional conditions on transfers to specific jurisdictions.
                Businesses must maintain records of all cross-border transfers and their legal basis.
              </p>
            </div>

            <div id="section-33" style={sectionStyle}>
              <h2 style={hStyle}>Section 33 — Penalties</h2>
              <p style={pStyle}>
                The DPDP Act prescribes significant financial penalties:
              </p>
              <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid var(--border)', color: 'var(--text-secondary)' }}>Violation</th>
                      <th style={{ textAlign: 'right', padding: '12px', borderBottom: '2px solid var(--border)', color: 'var(--text-secondary)' }}>Maximum Penalty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Failure to take reasonable security measures leading to a data breach', '₹250 Crore'],
                      ['Non-compliance with provisions relating to children\'s data', '₹200 Crore'],
                      ['Non-compliance with Data Protection Board directions', '₹150 Crore'],
                      ['Breach of any other provision of the Act or rules', '₹50 Crore'],
                      ['Data Principal breach of duties (Section 15)', '₹10,000'],
                    ].map(([violation, penalty]) => (
                      <tr key={violation}>
                        <td style={{ padding: '12px', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>{violation}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid var(--border)', textAlign: 'right', fontWeight: 600, color: 'var(--danger)' }}>{penalty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={pStyle}>
                Note: Penalties are determined by the Data Protection Board on a case-by-case basis, considering
                factors like the nature and gravity of the breach, the type of personal data affected, and whether
                the breach was repetitive.
              </p>
            </div>

            <div className="card" style={{ padding: '32px', textAlign: 'center', background: 'var(--bg-secondary)' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Start Your Compliance Journey</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '14px' }}>
                Use our free tools to assess your readiness and generate compliant documents.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/tools/compliance-score" className="btn-primary" style={{ padding: '12px 28px' }}>Check Compliance Score</Link>
                <Link to="/tools/compliance-checklist" className="btn-secondary" style={{ padding: '12px 28px' }}>View Full Checklist</Link>
              </div>
            </div>

            <div style={{ marginTop: '48px' }}>
              <h2 style={hStyle}>Frequently Asked Questions</h2>
              {faqItems.map(f => (
                <div key={f.q} style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>{f.q}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.a}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
              <ShareButtons title="DPDP Act 2023 Explained: Section-by-Section Guide" text="Comprehensive guide to India's DPDP Act — understand every section in plain language." />
            </div>
          </article>
        </div>
      </div>
    </>
  )
}

export default DPDPExplainer
