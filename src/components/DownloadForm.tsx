import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface DownloadFormProps {
  onSearch?: (url: string) => Promise<{ success: boolean; data?: unknown; error?: string }>;
  onResult?: (data: unknown, inputUrl: string) => void;
}

export default function DownloadForm({ onSearch, onResult }: DownloadFormProps) {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateUrl = (inputUrl: string): boolean => {
    const fbUrlPattern = /(?:https?:\/\/)?(?:www\.)?facebook\.com/i;
    return fbUrlPattern.test(inputUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!url.trim()) {
      setError(t('home.invalidUrl'));
      return;
    }

    if (!validateUrl(url)) {
      setError(t('home.invalidUrl'));
      return;
    }

    if (!onSearch) {
      setError('Search handler not configured.');
      return;
    }

    setLoading(true);

    try {
      const result = await onSearch(url);
      if (!result?.success) {
        setError(result?.error || 'Failed to fetch media.');
        return;
      }

      setSuccess(true);
      onResult?.(result.data, url);
      setUrl('');

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="download-form">
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-circle me-2"></i>
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError('')}
          ></button>
        </div>
      )}

      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="bi bi-check-circle me-2"></i>
          {t('home.success')}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccess(false)}
          ></button>
        </div>
      )}

      <div className="mb-3">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder={t('home.pasteUrl')}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        className="btn btn-cta btn-lg w-100"
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Searching...
          </>
        ) : (
          <>
            <i className="bi bi-search me-2"></i>
            Search
          </>
        )}
      </button>

      <div className="format-preview">
        <div className="format-badge">
          <i className="bi bi-film me-1"></i>MP4 HD
        </div>
        <div className="format-badge">
          <i className="bi bi-film me-1"></i>1080p
        </div>
        <div className="format-badge">
          <i className="bi bi-film me-1"></i>2K
        </div>
        <div className="format-badge">
          <i className="bi bi-film me-1"></i>4K
        </div>
        <div className="format-badge">
          <i className="bi bi-music-note me-1"></i>MP3
        </div>
        <div className="format-badge">
          <i className="bi bi-music-note me-1"></i>320kbps
        </div>
      </div>
    </form>
  );
}
