import { useEffect, useRef, useState } from 'react';
import DownloadForm from '../components/DownloadForm';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  const resultRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pauseHideTimerRef = useRef<number | null>(null);

  const [mediaItems, setMediaItems] = useState<Array<{
    url: string;
    type: 'video' | 'audio' | 'unknown';
    quality?: string;
    ext?: string;
    size?: string | number;
    thumbnail?: string;
    filename?: string;
  }>>([]);
  const [selectedMedia, setSelectedMedia] = useState<{
    url: string;
    type: 'video' | 'audio' | 'unknown';
    quality?: string;
    ext?: string;
    size?: string | number;
    thumbnail?: string;
    filename?: string;
  } | null>(null);
  const [resultTitle, setResultTitle] = useState('Media Preview');
  const [downloadLoadingUrl, setDownloadLoadingUrl] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState('');
  const [previewError, setPreviewError] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCenterControl, setShowCenterControl] = useState(true);
  const [downloadedItems, setDownloadedItems] = useState<Array<{
    url: string;
    type: 'video' | 'audio' | 'unknown';
    quality?: string;
    ext?: string;
    size?: string | number;
    filename: string;
    thumbnail?: string;
  }>>([]);

  const normalizeMedia = (data: any) => {
    const items: Array<{
      url: string;
      type: 'video' | 'audio' | 'unknown';
      quality?: string;
      ext?: string;
      size?: string | number;
      thumbnail?: string;
      filename?: string;
    }> = [];

    const resolveUrl = (raw?: string) => {
      if (!raw || typeof raw !== 'string') return null;
      if (raw.startsWith('http')) return raw;
      if (raw.startsWith('//')) return `${window.location.protocol}${raw}`;
      if (raw.startsWith('/render.php')) return `https://d.rapidcdn.app${raw}`;
      if (raw.startsWith('/')) return `${API_BASE_URL}${raw}`;
      return null;
    };

    const toItem = (item: any) => {
      if (typeof item === 'string') {
        const resolved = resolveUrl(item);
        return resolved ? { url: resolved, type: 'video' as const } : null;
      }

      const rawUrl =
        item?.url ||
        item?.link ||
        item?.download ||
        item?.downloadUrl ||
        item?.download_url ||
        item?.src ||
        item?.source ||
        item?.video ||
        item?.audio ||
        item?.media ||
        item?.hd ||
        item?.sd;

      const url = resolveUrl(rawUrl);
      if (!url) {
        return null;
      }
      const mime = item?.mime || item?.type || '';
      const type: 'video' | 'audio' | 'unknown' = mime.startsWith('audio')
        ? 'audio'
        : mime.startsWith('video')
          ? 'video'
          : item?.extension === 'mp3' || item?.ext === 'mp3'
            ? 'audio'
            : 'video';
      return {
        url,
        type,
        quality: item?.quality || item?.qualityLabel || item?.resolution || item?.label,
        ext: item?.extension || item?.ext || (item?.filename ? item.filename.split('.').pop() : undefined),
        size: item?.size || item?.filesize,
        thumbnail: item?.thumbnail,
        filename: item?.filename
      };
    };

    const collect = (arr: any[]) => {
      arr.forEach((item) => {
        const normalized = toItem(item);
        if (normalized) {
          items.push(normalized);
        }
      });
    };

    const collectFromSource = (source: any) => {
      if (!source) return;

      if (Array.isArray(source)) {
        collect(source);
        return;
      }

      if (Array.isArray(source?.medias)) collect(source.medias);
      if (Array.isArray(source?.media)) collect(source.media);
      if (Array.isArray(source?.videos)) collect(source.videos);
      if (Array.isArray(source?.video)) collect(source.video);
      if (Array.isArray(source?.audios)) collect(source.audios);
      if (Array.isArray(source?.audio)) collect(source.audio);
      if (Array.isArray(source?.results)) collect(source.results);
      if (Array.isArray(source?.result)) collect(source.result);
      if (Array.isArray(source?.downloads)) collect(source.downloads);
      if (Array.isArray(source?.links)) collect(source.links);
      if (Array.isArray(source?.data)) collect(source.data);
    };

    collectFromSource(data);
    collectFromSource(data?.data);
    collectFromSource(data?.result);
    collectFromSource(data?.response);
    collectFromSource(data?.payload);
    collectFromSource(data?.result?.data);
    collectFromSource(data?.response?.data);
    collectFromSource(data?.payload?.data);

    if (!items.length) {
      const single = toItem(data);
      if (single) items.push(single);
    }

    const unique = new Map(items.map((item) => [item.url, item]));
    return Array.from(unique.values());
  };

  const isFacebookStoryUrl = (inputUrl: string) => {
    try {
      const parsed = new URL(inputUrl);
      const hostname = parsed.hostname.toLowerCase();
      const path = parsed.pathname.toLowerCase();
      const hasStoryPath = path.includes("/stories/");
      const hasViewSingle = parsed.searchParams.get("view_single") === "1";
      return hostname.includes("facebook.com") && hasStoryPath && hasViewSingle;
    } catch (err) {
      return false;
    }
  };

  const handleSearch = async (inputUrl: string) => {
    const response = await fetch(
      `${API_BASE_URL}/api/meta/download?url=${encodeURIComponent(inputUrl)}`
    );
    const payload = await response.json();
    if (!response.ok || !payload?.success) {
      return { success: false, error: payload?.error || 'Unable to fetch media.' };
    }

    const mediaItems = normalizeMedia(payload?.data);
    if (!mediaItems.length) {
      if (isFacebookStoryUrl(inputUrl)) {
        return {
          success: false,
          error: 'This Facebook story link is not publicly accessible. Please log in and use a public post/reel/video link.'
        };
      }
      return { success: false, error: 'No downloadable media found for this link.' };
    }

    return { success: true, data: payload.data };
  };

  const buildStreamUrl = (mediaUrl?: string) => {
    if (!mediaUrl) return '';
    return `${API_BASE_URL}/api/meta/stream?mediaUrl=${encodeURIComponent(mediaUrl)}`;
  };

  const handleResult = (data: any) => {
    const items = normalizeMedia(data);
    if (!items.length) {
      setDownloadError('No downloadable media found for this link.');
      return;
    }

    const title =
      data?.title ||
      data?.caption ||
      data?.description ||
      data?.author ||
      'Media Preview';
    const preferred =
      items.find((item) => item.type === 'video' && /720/i.test(item.quality || '')) ||
      items.find((item) => item.type === 'video') ||
      items[0];
    setResultTitle(title);
    setMediaItems(items);
    setSelectedMedia(preferred);
    setDownloadError('');
    setPreviewError('');
    setIsPlaying(false);
    setShowCenterControl(true);
  };

  const buildFileName = (base: string, item: { ext?: string; type: string }) => {
    const safeBase = base
      .replace(/[^a-z0-9_-]+/gi, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '');
    const extension =
      item.ext ||
      (item.type === 'audio' ? 'mp3' : 'mp4');
    return `${safeBase || 'download'}.${extension}`;
  };

  const handleDownload = async (item?: {
    url: string;
    type: 'video' | 'audio' | 'unknown';
    quality?: string;
    ext?: string;
    size?: string | number;
  }) => {
    const target = item || selectedMedia;
    if (!target?.url) return;
    setDownloadLoadingUrl(target.url);
    setDownloadError('');

    try {
      const filename = buildFileName(resultTitle, target);
      const response = await fetch(
        `${API_BASE_URL}/api/meta/file?mediaUrl=${encodeURIComponent(
          target.url
        )}&filename=${encodeURIComponent(filename)}`
      );

      if (!response.ok) {
        throw new Error('Download failed.');
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(blobUrl);

      setDownloadedItems((prev) => {
        const exists = prev.some((item) => item.url === target.url);
        if (exists) return prev;
        return [
          {
            ...target,
            filename
          },
          ...prev
        ];
      });
    } catch (err) {
      setDownloadError('Download failed. Please try again.');
    } finally {
      setDownloadLoadingUrl(null);
    }
  };

  const toggleVideoPlayback = async () => {
    const media = videoRef.current;
    if (!media) return;

    try {
      if (pauseHideTimerRef.current) {
        window.clearTimeout(pauseHideTimerRef.current);
        pauseHideTimerRef.current = null;
      }
      setShowCenterControl(true);

      if (media.paused || media.ended) {
        await media.play();
        setIsPlaying(true);
      } else {
        media.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      setPreviewError('Unable to control playback for this video.');
    }
  };

  const handleVideoPause = () => {
    if (pauseHideTimerRef.current) {
      window.clearTimeout(pauseHideTimerRef.current);
      pauseHideTimerRef.current = null;
    }
    setIsPlaying(false);
    setShowCenterControl(true);
  };

  const handleVideoPlay = () => {
    if (pauseHideTimerRef.current) {
      window.clearTimeout(pauseHideTimerRef.current);
      pauseHideTimerRef.current = null;
    }
    setShowCenterControl(true);
    setIsPlaying(true);

    pauseHideTimerRef.current = window.setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowCenterControl(false);
      }
      pauseHideTimerRef.current = null;
    }, 1000);
  };

  useEffect(() => {
    if (mediaItems.length > 0 && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [mediaItems.length]);

  useEffect(() => {
    return () => {
      if (pauseHideTimerRef.current) {
        window.clearTimeout(pauseHideTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section pt-5 pb-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4">{t('home.title')}</h1>
              <p className="lead mb-4">{t('home.heroSubheading')}</p>
              <DownloadForm onSearch={handleSearch} onResult={handleResult} />
            </div>
          </div>
        </div>
      </section>

      <div ref={resultRef}></div>

      {selectedMedia && (
        <section className="py-5 bg-light">
          <div className="container">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3 gap-3 flex-wrap">
                  <div>
                    <h3 className="mb-1">{resultTitle}</h3>
                    <p className="text-muted mb-0">Preview and download your media</p>
                  </div>
                </div>
                <div>
                  <div>
                    {selectedMedia.type === 'audio' ? (
                      <audio
                        ref={audioRef}
                        key={selectedMedia.url}
                        controls
                        className="w-100"
                        src={buildStreamUrl(selectedMedia.url)}
                        onError={() => setPreviewError('Audio preview failed. You can still try Download.')}
                      />
                    ) : (
                      <div className="preview-video-shell">
                        {previewError && selectedMedia.thumbnail ? (
                          <img
                            src={selectedMedia.thumbnail}
                            alt="Video thumbnail"
                            className="preview-video-fallback"
                          />
                        ) : (
                          <video
                            ref={videoRef}
                            key={selectedMedia.url}
                            controls
                            className="preview-video-player"
                            src={buildStreamUrl(selectedMedia.url)}
                            poster={selectedMedia.thumbnail}
                            playsInline
                            preload="metadata"
                            onPlay={handleVideoPlay}
                            onPause={handleVideoPause}
                            onEnded={() => {
                              if (pauseHideTimerRef.current) {
                                window.clearTimeout(pauseHideTimerRef.current);
                                pauseHideTimerRef.current = null;
                              }
                              setIsPlaying(false);
                              setShowCenterControl(true);
                            }}
                            onError={() => setPreviewError('Video preview failed. You can still try Download.')}
                          />
                        )}
                        <button
                          type="button"
                          className={`preview-play-overlay ${isPlaying ? 'is-playing' : ''} ${showCenterControl ? '' : 'is-hidden'}`}
                          onClick={toggleVideoPlayback}
                          aria-label={isPlaying ? 'Pause video' : 'Play video'}
                        >
                          <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
                        </button>
                      </div>
                    )}
                    {previewError && (
                      <div className="alert alert-warning mt-3 mb-0">{previewError}</div>
                    )}
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-cta btn-lg w-100"
                      onClick={() => handleDownload()}
                      disabled={downloadLoadingUrl === selectedMedia.url}
                    >
                      {downloadLoadingUrl === selectedMedia.url ? (
                        <>
                          <span className="spinner spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-download me-2"></i>
                          Download
                        </>
                      )}
                    </button>
                  </div>
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    {mediaItems.map((item) => (
                      <button
                        key={item.url}
                        type="button"
                        className={`btn btn-sm ${
                          item.url === selectedMedia.url ? 'btn-primary' : 'btn-outline-primary'
                        }`}
                        onClick={() => {
                          setSelectedMedia(item);
                          setPreviewError('');
                          setIsPlaying(false);
                          setShowCenterControl(true);
                          videoRef.current?.pause();
                          audioRef.current?.pause();
                        }}
                      >
                        {item.type === 'audio' ? 'Audio' : 'Video'}
                        {item.quality ? ` • ${item.quality}` : ''}
                      </button>
                    ))}
                  </div>
                  {downloadError && (
                    <div className="alert alert-danger mt-3 mb-0">{downloadError}</div>
                  )}
                  </div>
                </div>
              </div>
            </div>
        </section>
      )}

      {/* Main Description Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <h2 className="h2 mb-4">Facebook Video Downloader - Without Watermark</h2>
              <p className="lead text-justify" style={{ lineHeight: '1.8' }}>
                Ever found a Facebook video you wanted to save, but there was no download button? Maybe it was a useful tutorial, a reel you liked, or important social media content you didn't want to lose. Streaming it again and again wastes time, and sometimes the video disappears from posts or stories.
              </p>
              <p className="text-justify" style={{ lineHeight: '1.8' }}>
                A Facebook video downloader download video without watermark solves that problem. It's a simple online solution that lets you copy the video link from the address bar, paste the URL into the input field, choose a format like MP4, MP3, AAC, or 3GP, and download the file in HD or 4K completely clean and without watermarks.
              </p>
              <p className="text-justify" style={{ lineHeight: '1.8' }}>
                Within seconds, the video is saved directly to your device for offline viewing. No extra software, no complicated steps, just a fast, secure, and watermark-free download process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Download Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h2 mb-5 text-center">How to Download Facebook Videos</h2>
          <p className="text-center mb-5 lead">Downloading Facebook videos online is simple and takes only a few seconds. Follow this easy process:</p>
          
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body">
                  <div className="display-4 mb-3">1️⃣</div>
                  <h4 className="card-title">Step 1: Copy the Facebook Video Link</h4>
                  <p className="card-text">Open Facebook and find the video you want to download. Copy the video URL from the address bar or tap the three dots on the post and select "Copy link."</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body">
                  <div className="display-4 mb-3">2️⃣</div>
                  <h4 className="card-title">Step 2: Paste the URL into the Input Field</h4>
                  <p className="card-text">Go to the Facebook video downloader tool and paste the link into the input field. The tool will automatically detect the video file.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body">
                  <div className="display-4 mb-3">3️⃣</div>
                  <h4 className="card-title">Step 3: Select Format & Quality</h4>
                  <p className="card-text">Choose your preferred format MP4 for video, MP3 or AAC for audio, or 3GP for smaller files. Then select the quality option such as HD, 1080p, or 4K.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body">
                  <div className="display-4 mb-3">4️⃣</div>
                  <h4 className="card-title">Step 4: Click Download</h4>
                  <p className="card-text">Click the download button and save the file directly to your device. Your video is now ready for offline viewing anytime.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download All Types Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="h2 mb-5 text-center">Download All Types of Facebook Media</h2>
          <p className="text-center mb-5 lead">Our Facebook video downloader is built to handle more than just standard videos. You can download different types of Facebook media quickly and in high quality.</p>
          
          <div className="row g-4 mb-5">
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title mb-3">📱 Facebook Reels Downloader</h4>
                  <p className="card-text">Found a reel you want to keep? Download Facebook reels in HD or 4K and save them directly to your device. Just copy the reel link, paste the URL into the tool, choose your format, and download without watermarks.</p>
                  <Link to={`/${lang}/how-to-download`} className="btn btn-primary btn-sm">View More →</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title mb-3">📸 Download Facebook Stories</h4>
                  <p className="card-text">Stories disappear after 24 hours. If you want to save a Facebook story before it expires, copy the video link and use the downloader to store the file for offline viewing.</p>
                  <Link to={`/${lang}/how-to-download`} className="btn btn-primary btn-sm">View More →</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title mb-3">📹 Download Videos from Facebook Posts</h4>
                  <p className="card-text">Many Facebook posts include useful or entertaining videos. Copy the video URL from the post, paste it into the input field, select your format (MP4, MP3, or more), and download in seconds.</p>
                  <Link to={`/${lang}/how-to-download`} className="btn btn-primary btn-sm">View More →</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title mb-3">🔒 Private Facebook Videos</h4>
                  <p className="card-text">Some videos are shared privately within groups or limited audiences. Where permitted, you can download private Facebook videos by using the correct video link through our secure tool.</p>
                  <Link to={`/${lang}/private-downloader`} className="btn btn-primary btn-sm">View More →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Format & Quality Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h2 mb-5 text-center">Download Facebook Videos in Any Format & Quality</h2>
          <p className="text-center mb-5 lead">Not everyone needs the same format or resolution. That's why our Facebook video downloader gives you flexible options for both video and audio downloads.</p>
          
          <div className="row g-4">
            <div className="col-lg-4">
              <h4 className="mb-4">📹 Video Formats</h4>
              <div className="list-group">
                <div className="list-group-item">
                  <h6 className="mb-2"><strong>MP4</strong></h6>
                  <p className="mb-0 small">The most popular format for high-quality playback. Works smoothly on almost all devices and media players.</p>
                </div>
                <div className="list-group-item">
                  <h6 className="mb-2"><strong>3GP</strong></h6>
                  <p className="mb-0 small">A smaller, lightweight format ideal for older mobile devices or saving storage space.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <h4 className="mb-4">🎵 Audio Formats</h4>
              <div className="list-group">
                <div className="list-group-item">
                  <h6 className="mb-2"><strong>MP3</strong></h6>
                  <p className="mb-0 small">Perfect if you only need the sound from a Facebook video, such as music, interviews, or podcasts.</p>
                </div>
                <div className="list-group-item">
                  <h6 className="mb-2"><strong>AAC</strong></h6>
                  <p className="mb-0 small">Offers clear audio with efficient compression and smaller file size.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <h4 className="mb-4">🎬 Resolution Options</h4>
              <div className="list-group">
                <div className="list-group-item">
                  <h6 className="mb-2">HD, 1080p & 4K</h6>
                  <p className="mb-0 small">Choose the quality that fits your needs: HD for clear playback, 1080p for full high-definition video, 4K for ultra-sharp detail and maximum quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="h2 mb-5 text-center">Key Features of Our Facebook Video Downloader</h2>
          <p className="text-center mb-5 lead">Our Facebook video downloader is built to be simple, fast, and reliable. Everything is designed around ease of use and high-quality downloads.</p>
          
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title mb-3">👤 User-Friendly Interface</h5>
                  <p className="card-text">The tool has a clean and simple interface. Just paste the video URL, choose your format, and click download. No confusion. No extra steps.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title mb-3">💻 Web-Based App</h5>
                  <p className="card-text">This is a fully web-based app, so you don't need to install any software. It works directly in your browser, whether you're on desktop or mobile.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title mb-3">🤖 AI-Enhanced Quality</h5>
                  <p className="card-text">Our system uses smart AI-based detection to identify the best available video quality. It helps ensure you get clear HD, 1080p, or 4K downloads whenever available.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title mb-3">👀 Video Player Preview</h5>
                  <p className="card-text">Before you download, you can preview the Facebook video using the built-in player. This helps confirm you selected the right file.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title mb-3">🌐 Cross-Platform Support</h5>
                  <p className="card-text">The downloader works smoothly on Android, iOS, and desktop devices. It supports modern browsers and delivers a consistent experience across platforms.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title mb-3">🚫 No Watermarks</h5>
                  <p className="card-text">Your downloaded video file stays clean. No added watermarks or branding.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title mb-3">⚡ Fast & Secure</h5>
                  <p className="card-text">The entire process is secure and private. Links are processed instantly, and files are delivered quickly to your device without unnecessary delays.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title mb-3">🌍 Works Everywhere</h5>
                  <p className="card-text">Our Facebook video downloader is fully web-based, so it works smoothly across devices and browsers without installing any extra software.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Compatibility Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h2 mb-5 text-center">Works on All Devices & Browsers</h2>
          
          <div className="row g-4">
            <div className="col-lg-6 col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">📱 Android Smartphones</h5>
                  <p className="card-text">Download Facebook videos directly to your Android device using your preferred browser. Just paste the video URL and save the file instantly.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">🍎 iPhone (iOS)</h5>
                  <p className="card-text">Use the tool on your iPhone or iPad through Safari or other supported browsers. Choose your format and download for offline viewing.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">🖥️ Desktop (Windows & Mac)</h5>
                  <p className="card-text">Whether you're on Windows or Mac, you can download HD or 4K Facebook videos straight to your computer in MP4, MP3, or other formats.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">🌐 Chrome Web Browser</h5>
                  <p className="card-text">The tool runs seamlessly in Chrome, offering a fast and smooth download process.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">🧭 Safari</h5>
                  <p className="card-text">Fully compatible with Safari for secure and simple downloads on both mobile and desktop.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">☁️ Google Drive Storage</h5>
                  <p className="card-text">You can also save your downloaded files to Google Drive if you prefer cloud storage for easier access across devices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="h2 mb-5 text-center">Why Choose Us?</h2>
          <p className="text-center mb-5 lead">There are many tools online, but not all of them are simple, safe, and reliable. Here's why users prefer our Facebook video downloader:</p>
          
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title mb-3">💰 Free Online Tool</h5>
                  <p className="card-text">You can download Facebook videos, reels, and stories without paying. It's a completely free tool with no complicated setup.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title mb-3">🚀 No Additional Software</h5>
                  <p className="card-text">Everything works in your browser. No apps, no extensions, and no extra software to install.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title mb-3">⚡ High-Speed Downloads</h5>
                  <p className="card-text">Once you paste the video URL and select your format, the download process starts instantly. Fast, smooth, and hassle-free.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title mb-3">🔐 Secure & Private</h5>
                  <p className="card-text">Your links are processed securely. We don't store your video files or personal data. The entire process stays private.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title mb-3">💎 No Hidden Pricing</h5>
                  <p className="card-text">There's no surprise pricing, locked features, or hidden plan upgrades. What you see is what you get.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title mb-3">📱 For Content Creators</h5>
                  <p className="card-text">Whether you're a content creator, social media manager, or just saving favorite videos, this tool is designed to make downloads quick and easy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h2 mb-5 text-center">Frequently Asked Questions</h2>
          
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading1">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true">
                      Can I download Facebook videos in 4K or HD?
                    </button>
                  </h2>
                  <div id="collapse1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Yes, if the original Facebook video supports it, you can choose 4K, 1080p, or HD before you click download. The available quality depends on the source video.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading2">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                      Can I convert a Facebook video to MP3?
                    </button>
                  </h2>
                  <div id="collapse2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Yes. Select the MP3 format to extract audio from a Facebook video. The tool will convert the media file and let you download the MP3 directly to your device.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading3">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                      Does it work for Facebook reels and stories?
                    </button>
                  </h2>
                  <div id="collapse3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Yes. You can download Facebook reels, stories, and regular posts using the same process. Just copy the video URL, paste it into the input field, and choose your format.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading4">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4">
                      Can I download private Facebook videos?
                    </button>
                  </h2>
                  <div id="collapse4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      You can download private Facebook videos only if you have permission to view them. The video must be accessible to your account for the link to work.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading5">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5">
                      Does the downloader add watermarks?
                    </button>
                  </h2>
                  <div id="collapse5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      No. The tool does not add watermarks to your downloaded file. You receive the video in its original format and quality.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading6">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse6">
                      Is it safe to use on mobile devices?
                    </button>
                  </h2>
                  <div id="collapse6" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Yes. This is a secure, web-based tool that works on Android and iOS mobile devices through your browser. No additional app or software installation is required.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-5">
            <Link to={`/${lang}/faq`} className="btn btn-primary btn-lg">
              View All FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-5">
        <div className="container">
          <div className="alert alert-warning" role="alert">
            <h4 className="alert-heading">Disclaimer</h4>
            <p className="mb-2">We do not host or store any videos on our servers. All media files are hosted on Facebook's CDNs and remain the property of their respective owners.</p>
            <p className="mb-2">This website is an independent social media tool and is not affiliated with Facebook™ or Meta Platforms, Inc. "Facebook" is a trademark of Meta, used for identification purposes only.</p>
            <p className="mb-0">Users are responsible for ensuring they have permission to download and use any content in accordance with applicable laws and Facebook's Terms of Service.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div className="container text-center">
          <h2 className="display-5 fw-bold mb-4">Start Downloading Facebook Videos Now</h2>
          <p className="lead mb-4">100% Free - No Registration Required - No Watermarks</p>
          <DownloadForm onSearch={handleSearch} onResult={handleResult} />
        </div>
      </section>

      {mediaItems.length > 0 && (
        <section className="py-5 bg-light">
          <div className="container">
            <h2 className="h4 mb-4 text-center">Found Media</h2>
            <div className="row g-4">
              {mediaItems.map((item) => (
                <div className="col-md-6 col-lg-4" key={item.url}>
                  <div className="card h-100 border-0 shadow-sm">
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        className="card-img-top"
                        alt="Media thumbnail"
                        style={{ objectFit: 'cover', maxHeight: '200px' }}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title mb-2">
                        {item.type === 'audio' ? 'Audio' : 'Video'}
                        {item.quality ? ` • ${item.quality}` : ''}
                      </h5>
                      <p className="text-muted small mb-3">
                        {item.ext ? item.ext.toUpperCase() : 'Media file'}
                      </p>
                      <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={() => {
                          setSelectedMedia(item);
                          setPreviewError('');
                          setIsPlaying(false);
                          setShowCenterControl(true);
                          videoRef.current?.pause();
                          audioRef.current?.pause();
                          resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {downloadedItems.length > 0 && (
        <section className="py-5">
          <div className="container">
            <h2 className="h4 mb-4 text-center">Downloaded Media</h2>
            <div className="row g-4">
              {downloadedItems.map((item) => (
                <div className="col-md-6 col-lg-4" key={item.url}>
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title mb-2">
                        {item.type === 'audio' ? 'Audio' : 'Video'}
                        {item.quality ? ` • ${item.quality}` : ''}
                      </h5>
                      <p className="text-muted small mb-3">{item.filename}</p>
                      <button
                        type="button"
                        className="btn btn-outline-primary w-100"
                        onClick={() => handleDownload(item)}
                        disabled={downloadLoadingUrl === item.url}
                      >
                        {downloadLoadingUrl === item.url ? (
                          <>
                            <span className="spinner spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Downloading...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-download me-2"></i>
                            Download Again
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
