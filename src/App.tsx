import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from './i18n/i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PrivateDownloader from './pages/PrivateDownloader';
import HowToDownload from './pages/HowToDownload';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';

function AppContent() {
  useTranslation();

  return (
    <Routes>
      {/* Redirect root to English */}
      <Route path="/" element={<Navigate to="/en/" replace />} />
      
      {/* Language routes */}
      <Route path="/:lang/">
        <Route index element={<Home />} />
        <Route path="private-downloader" element={<PrivateDownloader />} />
        <Route path="how-to-download" element={<HowToDownload />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  useEffect(() => {
    // Initialize i18n on app load
    const path = window.location.pathname;
    const match = path.match(/\/([a-z]{2}(?:-[a-z]{2})?)\/?/i);
    if (match) {
      const matched = match[1];
      const available = Object.keys(i18n.options.resources || {});
      const normalized = available.find(
        (lang) => lang.toLowerCase() === matched.toLowerCase()
      ) || matched;
      i18n.changeLanguage(normalized);
    }
  }, []);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <AppContent />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
