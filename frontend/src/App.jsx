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
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/embed" element={<Embed />} />
      </Route>
    </Routes>
  )
}

export default App
