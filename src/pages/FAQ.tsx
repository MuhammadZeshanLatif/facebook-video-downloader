import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FAQAccordion from '../components/FAQAccordion';

export default function FAQ() {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to all your questions about FBVideo Pro</p>
        </div>
      </section>

      {/* Main FAQ Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="mb-5">
                <h2 className="mb-4">General Questions</h2>
                <FAQAccordion />
              </div>

              <hr className="my-5" />

              {/* Additional FAQ Categories */}
              <div className="mb-5">
                <h2 className="mb-4">Download Quality & Formats</h2>
                <div className="accordion" id="qualityAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#quality1">
                        What is the highest quality I can download?
                      </button>
                    </h2>
                    <div id="quality1" className="accordion-collapse collapse" data-bs-parent="#qualityAccordion">
                      <div className="accordion-body">
                        The highest quality available is 4K (3840x2160 pixels). However, availability depends on 
                        the original video upload quality on Facebook. Most videos are available in 1080p or 720p.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#quality2">
                        What's the difference between MP4 and MP3?
                      </button>
                    </h2>
                    <div id="quality2" className="accordion-collapse collapse" data-bs-parent="#qualityAccordion">
                      <div className="accordion-body">
                        MP4 is a video format containing both video and audio. MP3 is an audio-only format. 
                        Choose MP4 if you want the full video experience, and MP3 if you only need the audio 
                        (like for podcasts or music).
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#quality3">
                        What does 320kbps mean?
                      </button>
                    </h2>
                    <div id="quality3" className="accordion-collapse collapse" data-bs-parent="#qualityAccordion">
                      <div className="accordion-body">
                        Bitrate (kbps) measures audio quality. 320kbps is high-quality audio (larger file), 
                        while 128kbps is standard quality (smaller file). Higher bitrate means better sound quality but larger file size.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#quality4">
                        How large are the downloaded files?
                      </button>
                    </h2>
                    <div id="quality4" className="accordion-collapse collapse" data-bs-parent="#qualityAccordion">
                      <div className="accordion-body">
                        File size depends on video length and quality:
                        <ul className="mt-2 mb-0">
                          <li>480p - 1-5 MB per minute</li>
                          <li>720p - 3-10 MB per minute</li>
                          <li>1080p - 8-15 MB per minute</li>
                          <li>MP3 - 0.5-1.5 MB per minute</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-5" />

              {/* Device & Compatibility */}
              <div className="mb-5">
                <h2 className="mb-4">Device & Compatibility</h2>
                <div className="accordion" id="deviceAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#device1">
                        Do I need to install an app?
                      </button>
                    </h2>
                    <div id="device1" className="accordion-collapse collapse" data-bs-parent="#deviceAccordion">
                      <div className="accordion-body">
                        No! FBVideo Pro is 100% web-based. It works in any modern browser without installation. 
                        No software, no plugins, no bloatware needed.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#device2">
                        Which browsers are supported?
                      </button>
                    </h2>
                    <div id="device2" className="accordion-collapse collapse" data-bs-parent="#deviceAccordion">
                      <div className="accordion-body">
                        All modern browsers are supported: Chrome, Firefox, Safari, Edge, and Opera. 
                        Works on both desktop and mobile browsers.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#device3">
                        Can I download on my phone?
                      </button>
                    </h2>
                    <div id="device3" className="accordion-collapse collapse" data-bs-parent="#deviceAccordion">
                      <div className="accordion-body">
                        Yes! FBVideo Pro works perfectly on iPhone, iPad, Android phones, and tablets. 
                        Visit our How To Download page for detailed mobile instructions.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#device4">
                        Can I play downloaded videos on my device?
                      </button>
                    </h2>
                    <div id="device4" className="accordion-collapse collapse" data-bs-parent="#deviceAccordion">
                      <div className="accordion-body">
                        Yes! MP4 videos are compatible with all major devices and video players. 
                        MP3 files work with any audio player. Both formats are universal standards.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-5" />

              {/* Legal & Safety */}
              <div className="mb-5">
                <h2 className="mb-4">Legal & Safety</h2>
                <div className="accordion" id="legalAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#legal1">
                        Is it legal to download Facebook videos?
                      </button>
                    </h2>
                    <div id="legal1" className="accordion-collapse collapse" data-bs-parent="#legalAccordion">
                      <div className="accordion-body">
                        Downloading videos for personal use is generally legal. However, you should respect 
                        copyright and intellectual property rights. Always ensure you have permission to 
                        download and use the content, especially before redistributing.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#legal2">
                        Is FBVideo Pro safe?
                      </button>
                    </h2>
                    <div id="legal2" className="accordion-collapse collapse" data-bs-parent="#legalAccordion">
                      <div className="accordion-body">
                        100% safe! FBVideo Pro:
                        <ul className="mt-2 mb-0">
                          <li>Uses HTTPS encryption for all connections</li>
                          <li>Contains no malware or viruses</li>
                          <li>Doesn't store your data or download history</li>
                          <li>Is trusted by millions of users worldwide</li>
                          <li>Has no hidden fees or premium traps</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#legal3">
                        Do you track my activity?
                      </button>
                    </h2>
                    <div id="legal3" className="accordion-collapse collapse" data-bs-parent="#legalAccordion">
                      <div className="accordion-body">
                        No! We don't track, log, or store any information about your downloads. 
                        Your video URLs, download history, and personal data are never recorded. 
                        Your privacy is completely protected.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#legal4">
                        How do you respect copyright?
                      </button>
                    </h2>
                    <div id="legal4" className="accordion-collapse collapse" data-bs-parent="#legalAccordion">
                      <div className="accordion-body">
                        FBVideo Pro is a tool that respects copyright. We don't encourage copyright 
                        infringement. We emphasize that users should only download content they have 
                        permission to use. We comply with DMCA takedown requests promptly.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-5" />

              {/* Troubleshooting */}
              <div className="mb-5">
                <h2 className="mb-4">Troubleshooting</h2>
                <div className="accordion" id="troubleAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#trouble1">
                        My download is too slow. What should I do?
                      </button>
                    </h2>
                    <div id="trouble1" className="accordion-collapse collapse" data-bs-parent="#troubleAccordion">
                      <div className="accordion-body">
                        Try these solutions:
                        <ul className="mt-2 mb-0">
                          <li>Check your internet speed</li>
                          <li>Close other applications using bandwidth</li>
                          <li>Try downloading a lower quality version</li>
                          <li>Refresh the page and try again</li>
                          <li>Use a wired connection instead of WiFi</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#trouble2">
                        The website won't load. What should I do?
                      </button>
                    </h2>
                    <div id="trouble2" className="accordion-collapse collapse" data-bs-parent="#troubleAccordion">
                      <div className="accordion-body">
                        Try these troubleshooting steps:
                        <ul className="mt-2 mb-0">
                          <li>Clear your browser cache and cookies</li>
                          <li>Disable any browser extensions or ad blockers</li>
                          <li>Try a different browser</li>
                          <li>Check your internet connection</li>
                          <li>Disable VPN if you're using one</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#trouble3">
                        I got an error message. What does it mean?
                      </button>
                    </h2>
                    <div id="trouble3" className="accordion-collapse collapse" data-bs-parent="#troubleAccordion">
                      <div className="accordion-body">
                        <p><strong>Invalid URL:</strong> Make sure the link is from facebook.com or fb.watch</p>
                        <p><strong>Video not found:</strong> The video may have been deleted or made private</p>
                        <p><strong>Access denied:</strong> You may not have permission to access this video</p>
                        <p><strong>Server error:</strong> Try again later or contact support</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#trouble4">
                        The downloaded file won't play. What do I do?
                      </button>
                    </h2>
                    <div id="trouble4" className="accordion-collapse collapse" data-bs-parent="#troubleAccordion">
                      <div className="accordion-body">
                        Try these solutions:
                        <ul className="mt-2 mb-0">
                          <li>Use a different video player (VLC Media Player is free and works with everything)</li>
                          <li>Update your media player to the latest version</li>
                          <li>Check that your device has enough storage space</li>
                          <li>Try downloading the video again in a different quality</li>
                          <li>Make sure the file download completed successfully</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-5" />

              {/* Still Need Help */}
              <div className="alert alert-info">
                <h4>Still Need Help?</h4>
                <p className="mb-0">
                  Couldn't find the answer you're looking for? Contact our support team at
                  <a href="mailto:support@fbvideopro.com" className="ms-1">support@fbvideopro.com</a>
                  or visit our
                  <Link to={`/${lang}/contact`} className="ms-1">contact page</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-5 text-center">Related Resources</h2>
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body text-center">
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    <i className="bi bi-book text-primary"></i>
                  </div>
                  <h5 className="card-title">How To Guide</h5>
                  <p className="card-text">Step-by-step tutorial for downloading videos</p>
                  <Link to={`/${lang}/how-to-download`} className="btn btn-sm btn-outline-primary">
                    Read Guide
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body text-center">
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    <i className="bi bi-newspaper text-primary"></i>
                  </div>
                  <h5 className="card-title">Blog</h5>
                  <p className="card-text">Tips, tricks, and technical articles</p>
                  <Link to={`/${lang}/blog`} className="btn btn-sm btn-outline-primary">
                    Visit Blog
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body text-center">
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    <i className="bi bi-envelope text-primary"></i>
                  </div>
                  <h5 className="card-title">Contact Us</h5>
                  <p className="card-text">Get in touch with our support team</p>
                  <Link to={`/${lang}/contact`} className="btn btn-sm btn-outline-primary">
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}