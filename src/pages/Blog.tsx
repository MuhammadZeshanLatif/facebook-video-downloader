import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Blog() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const articles = [
    { title: t('blog.article1'), description: t('blog.article1Desc') },
    { title: t('blog.article2'), description: t('blog.article2Desc') },
    { title: t('blog.article3'), description: t('blog.article3Desc') },
    { title: t('blog.article4'), description: t('blog.article4Desc') },
    { title: t('blog.article5'), description: t('blog.article5Desc') },
    { title: t('blog.article6'), description: t('blog.article6Desc') }
  ];

  return (
    <div className="py-5">
      <div className="container">
        <h1>{t('blog.heading')}</h1>
        <p className="lead">{t('blog.subheading')}</p>

        <div className="row g-4 mt-4">
          {articles.map((article, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="blog-card">
                <div className="blog-card-image">
                  <i className="bi bi-file-post"></i>
                </div>
                <div className="blog-card-body">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <div className="blog-card-footer">
                    <a href="#" className="btn-read-more">
                      {t('blog.readMore')} <i className="bi bi-arrow-right ms-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
