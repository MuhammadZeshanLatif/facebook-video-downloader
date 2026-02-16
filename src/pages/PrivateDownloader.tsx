import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function PrivateDownloader() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="py-5">
      <div className="container">
        <h1>{t('privateDownloader.heading')}</h1>
        <p className="lead">{t('privateDownloader.subheading')}</p>

        <div className="row mt-5">
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0">{t('privateDownloader.method')}</h3>
              </div>
              <div className="card-body">
                <div className="step-card mb-4">
                  <div className="step-number">1</div>
                  <h4>{t('privateDownloader.step1')}</h4>
                  <p>{t('privateDownloader.step1Desc')}</p>
                </div>
                <div className="step-card mb-4">
                  <div className="step-number">2</div>
                  <h4>{t('privateDownloader.step2')}</h4>
                  <p>{t('privateDownloader.step2Desc')}</p>
                </div>
                <div className="step-card mb-4">
                  <div className="step-number">3</div>
                  <h4>{t('privateDownloader.step3')}</h4>
                  <p>{t('privateDownloader.step3Desc')}</p>
                </div>
                <div className="step-card">
                  <div className="step-number">4</div>
                  <h4>{t('privateDownloader.step4')}</h4>
                  <p>{t('privateDownloader.step4Desc')}</p>
                </div>
              </div>
            </div>

            <div className="alert alert-warning mt-4">
              <h4 className="alert-heading">{t('privateDownloader.warning')}</h4>
              <p>{t('privateDownloader.warningText')}</p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header bg-success text-white">
                <h4 className="mb-0">{t('privateDownloader.security')}</h4>
              </div>
              <div className="card-body">
                <p>{t('privateDownloader.securityDesc')}</p>
                <h5 className="mt-4">{t('privateDownloader.support')}</h5>
                <ul>
                  <li>{t('privateDownloader.friendOnly')}</li>
                  <li>{t('privateDownloader.customAudience')}</li>
                  <li>{t('privateDownloader.storyDownloads')}</li>
                  <li>{t('privateDownloader.archiveVideos')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <div className="text-center">
              <Link to={`/${lang}/`} className="btn btn-primary btn-lg">
                <i className="bi bi-house me-2"></i>
                {t('nav.home')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
