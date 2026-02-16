import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  useEffect(() => {
    const baseUrl = 'https://facebook-video-downloader-mu.vercel.app';
    const pathname = location.pathname || '/en/';
    const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
    const currentUrl = `${baseUrl}${normalized}`;

    const routeTitleMap: Record<string, string> = {
      '/': 'Free Facebook Video Downloader - HD, 1080p & MP3',
      '/en/': 'Free Facebook Video Downloader - HD, 1080p & MP3',
      '/en/how-to-download/': 'How To Download Facebook Videos - Step by Step Guide',
      '/en/private-downloader/': 'Private Facebook Video Downloader - Secure Download Tool',
      '/en/about/': 'About Us - Facebook Video Downloader',
      '/en/blog/': 'Blog - Facebook Video Downloader Tips & Guides',
      '/en/contact/': 'Contact Us - Facebook Video Downloader',
      '/en/faq/': 'FAQ - Facebook Video Downloader'
    };

    const routeDescriptionMap: Record<string, string> = {
      '/': 'Download Facebook videos, reels, and stories in HD and MP3 online for free.',
      '/en/': 'Download Facebook videos, reels, and stories in HD and MP3 online for free.',
      '/en/how-to-download/': 'Learn how to download Facebook videos safely with this step-by-step guide.',
      '/en/private-downloader/': 'Download private Facebook videos when you have access permission.',
      '/en/about/': 'Learn more about our mission, privacy approach, and download platform.',
      '/en/blog/': 'Read tips, guides, and updates for Facebook video downloads.',
      '/en/contact/': 'Contact our team for help with Facebook video downloads.',
      '/en/faq/': 'Find answers to common Facebook downloader questions.'
    };

    document.title = routeTitleMap[normalized] || 'Facebook Video Downloader';

    const updateMeta = (selector: string, content: string) => {
      const node = document.querySelector(selector);
      if (node) {
        node.setAttribute('content', content);
      }
    };

    updateMeta('meta[name="description"]', routeDescriptionMap[normalized] || routeDescriptionMap['/en/']);
    updateMeta('meta[property="og:url"]', currentUrl);
    updateMeta('meta[property="og:title"]', document.title);
    updateMeta('meta[property="og:description"]', routeDescriptionMap[normalized] || routeDescriptionMap['/en/']);
    updateMeta('meta[name="twitter:title"]', document.title);
    updateMeta('meta[name="twitter:description"]', routeDescriptionMap[normalized] || routeDescriptionMap['/en/']);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);
  }, [location.pathname]);

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
      document.documentElement.lang = normalized;
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
