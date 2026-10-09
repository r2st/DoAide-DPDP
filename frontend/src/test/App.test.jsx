import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { describe, it, expect } from 'vitest'
import App from '../App'
import Home from '../pages/Home'
import Tools from '../pages/Tools'
import ComplianceScore from '../pages/ComplianceScore'
import BreachChecklist from '../pages/BreachChecklist'
import Countdown from '../pages/Countdown'
import Blog from '../pages/Blog'
import Embed from '../pages/Embed'
import ShareButtons from '../components/ShareButtons'
import ComplianceChecklist from '../pages/ComplianceChecklist'
import DPAGenerator from '../pages/DPAGenerator'
import DSRHandler from '../pages/DSRHandler'
import ConsentWidget from '../pages/ConsentWidget'
import DPDPExplainer from '../pages/DPDPExplainer'
import ReadinessAssessment from '../pages/ReadinessAssessment'
import { blogPosts } from '../pages/blogData'

function renderWithRouter(ui, { route = '/' } = {}) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </HelmetProvider>
  )
}

describe('App routing', () => {
  it('renders home page at /', () => {
    renderWithRouter(<App />)
    expect(screen.getByText(/DPDP Ready/i)).toBeInTheDocument()
  })

  it('renders tools page at /tools', () => {
    renderWithRouter(<App />, { route: '/tools' })
    expect(screen.getByText(/Free DPDP Compliance Tools/i)).toBeInTheDocument()
  })

  it('renders compliance score at /tools/compliance-score', () => {
    renderWithRouter(<App />, { route: '/tools/compliance-score' })
    expect(screen.getByText(/Compliance Score Calculator/i)).toBeInTheDocument()
  })

  it('renders blog at /blog', () => {
    renderWithRouter(<App />, { route: '/blog' })
    expect(screen.getByText(/Expert guides/i)).toBeInTheDocument()
  })

  it('renders DPA generator at /tools/dpa-generator', () => {
    renderWithRouter(<App />, { route: '/tools/dpa-generator' })
    expect(screen.getByText(/Data Processing Agreement/i)).toBeInTheDocument()
  })

  it('renders DSR handler at /tools/dsr-handler', () => {
    renderWithRouter(<App />, { route: '/tools/dsr-handler' })
    expect(screen.getByText(/Data Subject Request/i)).toBeInTheDocument()
  })

  it('renders consent widget at /tools/consent-widget', () => {
    renderWithRouter(<App />, { route: '/tools/consent-widget' })
    expect(screen.getByText(/Consent Widget Generator/i)).toBeInTheDocument()
  })

  it('renders compliance checklist at /tools/compliance-checklist', () => {
    renderWithRouter(<App />, { route: '/tools/compliance-checklist' })
    expect(screen.getAllByText(/Compliance Checklist/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders DPDP explainer at /dpdp-act', () => {
    renderWithRouter(<App />, { route: '/dpdp-act' })
    expect(screen.getAllByText(/DPDP Act/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders readiness assessment at /tools/readiness-assessment', () => {
    renderWithRouter(<App />, { route: '/tools/readiness-assessment' })
    expect(screen.getByText(/DPDP Readiness Assessment/i)).toBeInTheDocument()
  })
})

describe('Home page', () => {
  it('shows hero CTA', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/Take Free Readiness Assessment/i)).toBeInTheDocument()
  })

  it('shows deadline warning', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/Nov 2026 deadline/i)).toBeInTheDocument()
  })

  it('shows stats', () => {
    renderWithRouter(<Home />)
    expect(screen.getAllByText(/80%/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/₹250 Cr/).length).toBeGreaterThanOrEqual(1)
  })

  it('shows free tools section', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/10 Free Compliance Tools/i)).toBeInTheDocument()
  })

  it('lists all 10 tools', () => {
    renderWithRouter(<Home />)
    expect(screen.getAllByText(/Consent Widget Generator/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/DPA Generator/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/DSR Handler/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Compliance Checklist/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Readiness Assessment/i).length).toBeGreaterThanOrEqual(1)
  })

  it('shows how it works section', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/Get Compliant in 3 Steps/i)).toBeInTheDocument()
  })

  it('shows testimonials section', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/Trusted by Indian Businesses/i)).toBeInTheDocument()
  })

  it('shows all testimonials', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/Rajesh K./i)).toBeInTheDocument()
    expect(screen.getByText(/Priya M./i)).toBeInTheDocument()
    expect(screen.getByText(/Amit S./i)).toBeInTheDocument()
    expect(screen.getByText(/Sneha D./i)).toBeInTheDocument()
  })

  it('shows final CTA', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/Don't Wait Until the Deadline/i)).toBeInTheDocument()
    expect(screen.getByText(/Take Free Assessment Now/i)).toBeInTheDocument()
  })

  it('shows no-login messaging', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/No login required/i)).toBeInTheDocument()
  })
})

describe('Tools page', () => {
  it('lists all free tools', () => {
    renderWithRouter(<Tools />)
    expect(screen.getByText(/Compliance Score Calculator/i)).toBeInTheDocument()
    expect(screen.getByText(/Privacy Policy Generator/i)).toBeInTheDocument()
    expect(screen.getByText(/Consent Notice Builder/i)).toBeInTheDocument()
    expect(screen.getByText(/Data Breach Response Checklist/i)).toBeInTheDocument()
  })

  it('lists new tools', () => {
    renderWithRouter(<Tools />)
    expect(screen.getByText(/Consent Widget Generator/i)).toBeInTheDocument()
    expect(screen.getByText(/Data Processing Agreement Generator/i)).toBeInTheDocument()
    expect(screen.getByText(/Data Subject Request Handler/i)).toBeInTheDocument()
    expect(screen.getByText(/Compliance Checklist/i)).toBeInTheDocument()
  })

  it('lists readiness assessment', () => {
    renderWithRouter(<Tools />)
    expect(screen.getByText(/DPDP Readiness Assessment/i)).toBeInTheDocument()
  })

  it('shows premium section', () => {
    renderWithRouter(<Tools />)
    expect(screen.getByText(/Premium Tools/i)).toBeInTheDocument()
  })
})

describe('ComplianceScore page', () => {
  it('shows first question', () => {
    renderWithRouter(<ComplianceScore />)
    expect(screen.getByText(/explicit consent/i)).toBeInTheDocument()
  })

  it('shows progress indicator', () => {
    renderWithRouter(<ComplianceScore />)
    expect(screen.getByText(/Question 1 of 20/i)).toBeInTheDocument()
  })
})

describe('BreachChecklist page', () => {
  it('shows checklist phases', () => {
    renderWithRouter(<BreachChecklist />)
    expect(screen.getByText(/Immediate \(0-6 hours\)/i)).toBeInTheDocument()
    expect(screen.getByText(/Notification \(24-72 hours\)/i)).toBeInTheDocument()
  })

  it('shows progress bar', () => {
    renderWithRouter(<BreachChecklist />)
    expect(screen.getByText(/0\/20 completed/i)).toBeInTheDocument()
  })
})

describe('Countdown page', () => {
  it('shows both deadlines', () => {
    renderWithRouter(<Countdown />)
    expect(screen.getAllByText(/Consent Manager/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Core.*Obligations/i).length).toBeGreaterThanOrEqual(1)
  })

  it('shows milestones', () => {
    renderWithRouter(<Countdown />)
    expect(screen.getByText(/Key Milestones/i)).toBeInTheDocument()
  })
})

describe('ComplianceChecklist page', () => {
  it('shows checklist title', () => {
    renderWithRouter(<ComplianceChecklist />)
    expect(screen.getAllByText(/Compliance Checklist/i).length).toBeGreaterThanOrEqual(1)
  })

  it('shows section categories', () => {
    renderWithRouter(<ComplianceChecklist />)
    expect(screen.getAllByText(/Legal/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Consent/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Data Principal/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Security/i).length).toBeGreaterThanOrEqual(1)
  })

  it('shows overall progress', () => {
    renderWithRouter(<ComplianceChecklist />)
    expect(screen.getByText(/Overall Progress/i)).toBeInTheDocument()
  })
})

describe('DPAGenerator page', () => {
  it('shows form title', () => {
    renderWithRouter(<DPAGenerator />)
    expect(screen.getByText(/Data Processing Agreement/i)).toBeInTheDocument()
  })

  it('shows controller and processor fields', () => {
    renderWithRouter(<DPAGenerator />)
    expect(screen.getByText(/Controller.*Name/i)).toBeInTheDocument()
    expect(screen.getByText(/Processor.*Name/i)).toBeInTheDocument()
  })

  it('shows generate button', () => {
    renderWithRouter(<DPAGenerator />)
    expect(screen.getByText(/Generate DPA/i)).toBeInTheDocument()
  })
})

describe('DSRHandler page', () => {
  it('shows form title', () => {
    renderWithRouter(<DSRHandler />)
    expect(screen.getByText(/Data Subject Request/i)).toBeInTheDocument()
  })

  it('shows request type selector', () => {
    renderWithRouter(<DSRHandler />)
    expect(screen.getByText(/Request Type/i)).toBeInTheDocument()
  })

  it('shows generate button', () => {
    renderWithRouter(<DSRHandler />)
    expect(screen.getByText(/Generate Response/i)).toBeInTheDocument()
  })
})

describe('ConsentWidget page', () => {
  it('shows form title', () => {
    renderWithRouter(<ConsentWidget />)
    expect(screen.getByText(/Consent Widget Generator/i)).toBeInTheDocument()
  })

  it('shows theme options', () => {
    renderWithRouter(<ConsentWidget />)
    expect(screen.getByText(/Theme/i)).toBeInTheDocument()
  })

  it('shows generate button', () => {
    renderWithRouter(<ConsentWidget />)
    expect(screen.getByText(/Generate Consent Widget/i)).toBeInTheDocument()
  })
})

describe('DPDPExplainer page', () => {
  it('shows main heading', () => {
    renderWithRouter(<DPDPExplainer />)
    expect(screen.getAllByText(/DPDP Act/i).length).toBeGreaterThanOrEqual(1)
  })

  it('shows key sections', () => {
    renderWithRouter(<DPDPExplainer />)
    expect(screen.getAllByText(/Lawful Processing/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Penalties/i).length).toBeGreaterThanOrEqual(1)
  })

  it('shows FAQ section', () => {
    renderWithRouter(<DPDPExplainer />)
    expect(screen.getAllByText(/Frequently Asked/i).length).toBeGreaterThanOrEqual(1)
  })
})

describe('ReadinessAssessment page', () => {
  it('shows assessment title', () => {
    renderWithRouter(<ReadinessAssessment />)
    expect(screen.getByText(/DPDP Readiness Assessment/i)).toBeInTheDocument()
  })

  it('shows 2-minute messaging', () => {
    renderWithRouter(<ReadinessAssessment />)
    expect(screen.getByText(/Quick 2-minute checklist/i)).toBeInTheDocument()
  })

  it('shows all category headings', () => {
    renderWithRouter(<ReadinessAssessment />)
    expect(screen.getByText('Data Inventory')).toBeInTheDocument()
    expect(screen.getByText('Consent')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Data Rights')).toBeInTheDocument()
    expect(screen.getByText('Security')).toBeInTheDocument()
    expect(screen.getByText('Governance')).toBeInTheDocument()
  })

  it('shows 20 checklist items', () => {
    renderWithRouter(<ReadinessAssessment />)
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(20)
  })

  it('shows submit button with counter', () => {
    renderWithRouter(<ReadinessAssessment />)
    expect(screen.getByText(/Get My Readiness Score \(0\/20\)/i)).toBeInTheDocument()
  })

  it('updates counter when items are checked', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ReadinessAssessment />)
    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0])
    expect(screen.getByText(/1\/20 items checked/i)).toBeInTheDocument()
    expect(screen.getByText(/Get My Readiness Score \(1\/20\)/i)).toBeInTheDocument()
  })

  it('shows results after submission', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ReadinessAssessment />)
    const submitBtn = screen.getByText(/Get My Readiness Score/i)
    await user.click(submitBtn)
    expect(screen.getByText(/Your DPDP Readiness Score/i)).toBeInTheDocument()
    expect(screen.getByText(/Critical/i)).toBeInTheDocument()
    expect(screen.getByText(/Breakdown by Area/i)).toBeInTheDocument()
  })

  it('shows perfect score when all items checked', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ReadinessAssessment />)
    const checkboxes = screen.getAllByRole('checkbox')
    for (const cb of checkboxes) {
      await user.click(cb)
    }
    const submitBtn = screen.getByText(/Get My Readiness Score \(20\/20\)/i)
    await user.click(submitBtn)
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText(/DPDP Ready/i)).toBeInTheDocument()
  })

  it('shows retake button in results', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ReadinessAssessment />)
    await user.click(screen.getByText(/Get My Readiness Score/i))
    expect(screen.getByText(/Retake Assessment/i)).toBeInTheDocument()
  })

  it('shows areas to address when not all items checked', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ReadinessAssessment />)
    await user.click(screen.getByText(/Get My Readiness Score/i))
    expect(screen.getByText(/Areas to Address/i)).toBeInTheDocument()
  })
})

describe('Blog page', () => {
  it('shows all blog posts', () => {
    renderWithRouter(<Blog />)
    blogPosts.forEach(post => {
      expect(screen.getByText(post.title)).toBeInTheDocument()
    })
  })
})

describe('Embed page', () => {
  it('shows embed code section', () => {
    renderWithRouter(<Embed />)
    expect(screen.getByText(/Embed Compliance Widget/i)).toBeInTheDocument()
    expect(screen.getByText(/Copy Embed Code/i)).toBeInTheDocument()
  })
})

describe('ShareButtons component', () => {
  it('renders share links', () => {
    renderWithRouter(<ShareButtons title="Test" text="Test share" />)
    expect(screen.getByText('WhatsApp')).toBeInTheDocument()
    expect(screen.getByText('Twitter')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
  })
})

describe('Blog data', () => {
  it('has 9 blog posts', () => {
    expect(blogPosts).toHaveLength(9)
  })

  it('all posts have required fields', () => {
    blogPosts.forEach(post => {
      expect(post.slug).toBeTruthy()
      expect(post.title).toBeTruthy()
      expect(post.content).toBeTruthy()
      expect(post.tags.length).toBeGreaterThan(0)
    })
  })

  it('all posts have unique slugs', () => {
    const slugs = blogPosts.map(p => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('includes penalties enforcement post', () => {
    expect(blogPosts.find(p => p.slug === 'dpdp-penalties-enforcement')).toBeTruthy()
  })

  it('includes startups guide post', () => {
    expect(blogPosts.find(p => p.slug === 'dpdp-compliance-for-startups')).toBeTruthy()
  })
})
