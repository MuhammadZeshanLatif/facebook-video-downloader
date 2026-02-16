import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function HowToDownload() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="py-5">
      <div className="container">
        <h1>{t('howToDownload.heading')}</h1>
        <p className="lead">{t('howToDownload.subheading')}</p>

        <div className="row mt-5">
          <div className="col-lg-6">
            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0">{t('howToDownload.desktopGuide')}</h3>
              </div>
              <div className="card-body">
                <div className="step-card mb-3">
                  <h4>{t('howToDownload.step1')}</h4>
                  <p>{t('howToDownload.step1Desc')}</p>
                </div>
                <div className="step-card mb-3">
                  <h4>{t('howToDownload.step2')}</h4>
                  <p>{t('howToDownload.step2Desc')}</p>
                </div>
                <div className="step-card mb-3">
                  <h4>{t('howToDownload.step3')}</h4>
                  <p>{t('howToDownload.step3Desc')}</p>
                </div>
                <div className="step-card mb-3">
                  <h4>{t('howToDownload.step4')}</h4>
                  <p>{t('howToDownload.step4Desc')}</p>
                </div>
                <div className="step-card">
                  <h4>{t('howToDownload.step5')}</h4>
                  <p>{t('howToDownload.step5Desc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card mb-4">
              <div className="card-header bg-success text-white">
                <h3 className="mb-0">{t('howToDownload.mobileGuide')}</h3>
              </div>
              <div className="card-body">
                <p className="mb-3"><strong>{t('howToDownload.mobileSteps')}:</strong></p>
                <ol>
                  <li>{t('howToDownload.mobileStep1')}</li>
                  <li>{t('howToDownload.mobileStep2')}</li>
                  <li>{t('howToDownload.mobileStep3')}</li>
                  <li>{t('howToDownload.mobileStep4')}</li>
                  <li>{t('howToDownload.mobileStep5')}</li>
                </ol>
              </div>
            </div>

            <div className="card">
              <div className="card-header bg-warning">
                <h3 className="mb-0">{t('howToDownload.troubleTitle')}</h3>
              </div>
              <div className="card-body">
                <h5>{t('howToDownload.issue1')}</h5>
                <p className="text-muted mb-3">{t('howToDownload.issue1Desc')}</p>

                <h5>{t('howToDownload.issue2')}</h5>
                <p className="text-muted mb-3">{t('howToDownload.issue2Desc')}</p>

                <h5>{t('howToDownload.issue3')}</h5>
                <p className="text-muted">{t('howToDownload.issue3Desc')}</p>
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
