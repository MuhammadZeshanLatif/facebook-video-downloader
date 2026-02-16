import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg navbar-light navbar-custom ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to={`/${lang}/`}>
          <i className="bi bi-play-circle me-2"></i>FBVideo Pro
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to={`/${lang}/`}>{t('nav.home')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/${lang}/private-downloader`}>{t('nav.privateDownloader')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/${lang}/how-to-download`}>{t('nav.howToDownload')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/${lang}/blog`}>{t('nav.blog')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/${lang}/about`}>{t('nav.about')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/${lang}/faq`}>{t('nav.faq')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/${lang}/contact`}>{t('nav.contact')}</Link>
            </li>
            <li className="nav-item ms-2 me-2">
              <LanguageSwitcher />
            </li>
            <li className="nav-item">
              <Link className="btn btn-cta" to={`/${lang}/`}>
                <i className="bi bi-download me-2"></i>{t('nav.downloadNow')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
