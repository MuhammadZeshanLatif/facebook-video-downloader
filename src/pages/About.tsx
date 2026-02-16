import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function About() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const values = [
    t('about.value1'),
    t('about.value2'),
    t('about.value3'),
    t('about.value4'),
    t('about.value5')
  ];

  return (
    <div className="py-5">
      <div className="container">
        <h1>{t('about.heading')}</h1>

        <div className="row mt-5 mb-5">
          <div className="col-lg-6">
            <h2>{t('about.mission')}</h2>
            <p className="lead">{t('about.missionDesc')}</p>

            <h2 className="mt-4">{t('about.whyWeBuilt')}</h2>
            <p>{t('about.whyDesc')}</p>

            <h2 className="mt-4">{t('about.technology')}</h2>
            <p>{t('about.techDesc')}</p>
          </div>

          <div className="col-lg-6">
            <h2>{t('about.security')}</h2>
            <p>{t('about.securityDesc')}</p>

            <h2 className="mt-4">{t('about.transparency')}</h2>
            <p>{t('about.transparencyDesc')}</p>

            <h2 className="mt-4">{t('about.ethical')}</h2>
            <p>{t('about.ethicalDesc')}</p>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <h2 className="mb-4">{t('about.values')}</h2>
            <div className="row g-3">
              {values.map((value, index) => (
                <div className="col-md-6" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="bi bi-check-circle me-2 text-success"></i>
                        {value}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12 text-center">
            <Link to={`/${lang}/`} className="btn btn-primary btn-lg">
              <i className="bi bi-house me-2"></i>
              {t('nav.home')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
