import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Send us a message anytime.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Contact Form */}
            <div className="col-lg-8">
              <h2 className="mb-4">Send us a Message</h2>

              {submitted && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <i className="bi bi-check-circle me-2"></i>
                  <strong>Thank you!</strong> Your message has been sent successfully. 
                  We'll get back to you as soon as possible.
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSubmitted(false)}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    <i className="bi bi-person me-2"></i>Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <i className="bi bi-envelope me-2"></i>Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    <i className="bi bi-chat-left me-2"></i>Subject
                  </label>
                  <select
                    className="form-select"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject...</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="feedback">General Feedback</option>
                    <option value="support">Support Request</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    <i className="bi bi-pencil me-2"></i>Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Please describe your message in detail..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send me-2"></i>
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <div className="alert alert-info mt-4">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Response Time:</strong> We typically respond to all inquiries within 24-48 hours during business days.
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-4">
              <h2 className="mb-4">Get in Touch</h2>

              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-envelope text-primary me-2"></i>Email
                  </h5>
                  <p className="card-text">
                    <a href="mailto:support@fbvideopro.com">support@fbvideopro.com</a>
                  </p>
                  <p className="small text-muted">We respond within 24 hours</p>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-chat-dots text-primary me-2"></i>Live Chat
                  </h5>
                  <p className="card-text">
                    Chat with our support team in real-time
                  </p>
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="bi bi-chat-dots me-1"></i>Start Chat
                  </button>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-telephone text-primary me-2"></i>Phone
                  </h5>
                  <p className="card-text">
                    <a href="tel:+1234567890">+1 (234) 567-890</a>
                  </p>
                  <p className="small text-muted">Monday - Friday, 9am - 6pm EST</p>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-building text-primary me-2"></i>Office
                  </h5>
                  <p className="card-text">
                    123 Tech Street<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-clock text-primary me-2"></i>Hours
                  </h5>
                  <ul className="list-unstyled small">
                    <li className="mb-1"><strong>Mon - Fri:</strong> 9:00 AM - 6:00 PM EST</li>
                    <li className="mb-1"><strong>Saturday:</strong> 10:00 AM - 4:00 PM EST</li>
                    <li><strong>Sunday:</strong> Closed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-4 text-center">Before You Contact Us</h2>
          <p className="text-center lead mb-4">
            Check our FAQ to see if your question has already been answered
          </p>

          <div className="accordion" id="helpAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#help1">
                  <i className="bi bi-exclamation-circle me-2"></i>
                  Why is my download not working?
                </button>
              </h2>
              <div id="help1" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                <div className="accordion-body">
                  <p>Common reasons and solutions:</p>
                  <ul>
                    <li>Invalid URL - Make sure it's from facebook.com</li>
                    <li>Video deleted - Check if the video still exists on Facebook</li>
                    <li>Internet connection - Try a faster connection</li>
                    <li>Browser cache - Clear your browser cache and try again</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#help2">
                  <i className="bi bi-question-circle me-2"></i>
                  How do I download private videos?
                </button>
              </h2>
              <div id="help2" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                <div className="accordion-body">
                  Visit our Private Downloader page for detailed instructions on downloading private videos with proper permissions.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#help3">
                  <i className="bi bi-shield-check me-2"></i>
                  Is FBVideo Pro safe?
                </button>
              </h2>
              <div id="help3" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                <div className="accordion-body">
                  Yes, FBVideo Pro is 100% safe. We use HTTPS encryption, don't store data, and are completely free from malware.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#help4">
                  <i className="bi bi-book me-2"></i>
                  How do I use FBVideo Pro on my phone?
                </button>
              </h2>
              <div id="help4" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                <div className="accordion-body">
                  Check our How To Download page for complete step-by-step guides for both iPhone and Android devices.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="py-5">
        <div className="container">
          <h2 className="mb-5 text-center">Ways to Reach Us</h2>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="feature-card text-center">
                <div className="icon">
                  <i className="bi bi-envelope"></i>
                </div>
                <h3>Email Support</h3>
                <p>
                  Send us an email anytime. We respond within 24 hours.
                </p>
                <a href="mailto:support@fbvideopro.com" className="btn btn-sm btn-outline-primary">
                  Email Us
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="feature-card text-center">
                <div className="icon">
                  <i className="bi bi-chat-dots"></i>
                </div>
                <h3>Live Chat</h3>
                <p>
                  Chat with our team in real-time for instant support.
                </p>
                <button className="btn btn-sm btn-outline-primary">
                  Start Chat
                </button>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="feature-card text-center">
                <div className="icon">
                  <i className="bi bi-telephone"></i>
                </div>
                <h3>Phone Support</h3>
                <p>
                  Call us during business hours for immediate assistance.
                </p>
                <a href="tel:+1234567890" className="btn btn-sm btn-outline-primary">
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}