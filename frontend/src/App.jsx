import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Tools from './pages/Tools'
import ComplianceScore from './pages/ComplianceScore'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ConsentNotice from './pages/ConsentNotice'
import BreachChecklist from './pages/BreachChecklist'
import Countdown from './pages/Countdown'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Embed from './pages/Embed'
import DPAGenerator from './pages/DPAGenerator'
import DSRHandler from './pages/DSRHandler'
import ConsentWidget from './pages/ConsentWidget'
import ComplianceChecklist from './pages/ComplianceChecklist'
import DPDPExplainer from './pages/DPDPExplainer'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/compliance-score" element={<ComplianceScore />} />
        <Route path="/tools/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/tools/consent-notice" element={<ConsentNotice />} />
        <Route path="/tools/breach-checklist" element={<BreachChecklist />} />
        <Route path="/tools/countdown" element={<Countdown />} />
        <Route path="/tools/dpa-generator" element={<DPAGenerator />} />
        <Route path="/tools/dsr-handler" element={<DSRHandler />} />
        <Route path="/tools/consent-widget" element={<ConsentWidget />} />
        <Route path="/tools/compliance-checklist" element={<ComplianceChecklist />} />
        <Route path="/dpdp-act" element={<DPDPExplainer />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/embed" element={<Embed />} />
      </Route>
    </Routes>
  )
}

export default App
