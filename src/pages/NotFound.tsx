import { Link, useParams } from 'react-router-dom';

export default function NotFound() {
  const { lang } = useParams<{ lang?: string }>();
  const safeLang = lang || 'en';

  return (
    <section className="py-5">
      <div className="container text-center">
        <h1 className="display-4 fw-bold mb-3">404</h1>
        <h2 className="h4 mb-3">Page not found</h2>
        <p className="text-muted mb-4">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to={`/${safeLang}/`} className="btn btn-cta btn-lg">
          Go to Home
        </Link>
      </div>
    </section>
  );
}
