import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5>
              <i className="bi bi-play-circle me-2"></i>FBVideo Pro
            </h5>
            <p className="text-muted">
              {t('home.heroSubheading')}
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5>{t('footer.quickLinks')}</h5>
            <Link to={`/${lang}/`}>{t('nav.home')}</Link>
            <Link to={`/${lang}/private-downloader`}>{t('nav.privateDownloader')}</Link>
            <Link to={`/${lang}/how-to-download`}>{t('nav.howToDownload')}</Link>
            <Link to={`/${lang}/about`}>{t('nav.about')}</Link>
            <Link to={`/${lang}/blog`}>{t('nav.blog')}</Link>
          </div>

          {/* Resources */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5>{t('footer.legalPages')}</h5>
            <Link to={`/${lang}/faq`}>{t('nav.faq')}</Link>
            <Link to={`/${lang}/contact`}>{t('nav.contact')}</Link>
            <a href="#privacy">{t('footer.privacyPolicy')}</a>
            <a href="#terms">{t('footer.terms')}</a>
            <a href="#dmca">{t('footer.dmca')}</a>
          </div>

          {/* Support */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5>{t('footer.contact')}</h5>
            <p className="mb-2">
              <i className="bi bi-envelope me-2"></i>
              <a href="mailto:support@fbvideopro.com" className="text-white-50">
                {t('contact.email_label')}
              </a>
            </p>
            <p className="mb-2">
              <i className="bi bi-telephone me-2"></i>
              <a href="tel:+1234567890" className="text-white-50">
                +1 (234) 567-890
              </a>
            </p>
            <p>
              <i className="bi bi-geo-alt me-2"></i>
              <span className="text-white-50">{t('contact.address')}</span>
            </p>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* Bottom Footer */}
        <div className="row align-items-center">
          <div className="col-md-6 mb-3 mb-md-0">
            <p className="mb-0 text-muted">
              &copy; {currentYear} {t('footer.copyright')}
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">
              <span className="text-muted">Creado con</span>
              <i className="bi bi-heart-fill text-danger mx-1"></i>
              <span className="text-muted">por FBVideo Pro</span>
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="row mt-4 pt-3 border-top border-secondary-subtle">
          <div className="col-12">
            <p className="text-center text-muted small mb-0">
              <i className="bi bi-shield-check me-1"></i>
              {t('footer.secure')} • {t('footer.noDara')} • HTTPS Seguro • Privacidad Primero • GDPR
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
