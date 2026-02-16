export default function FAQAccordion() {
  const faqs = [
    {
      id: 1,
      question: 'Is it legal to download Facebook videos?',
      answer: 'Downloading Facebook videos for personal use is generally legal. However, you should respect copyright rules and avoid sharing protected content without permission. Always make sure you have the right to download and use the content.'
    },
    {
      id: 2,
      question: 'Can I download private Facebook videos?',
      answer: 'Our standard tool downloads public videos. For private videos, you can use our Private Downloader only if you are authorized to view the content. Always respect privacy settings and permissions.'
    },
    {
      id: 3,
      question: 'Is this tool safe to use?',
      answer: 'Yes, FBVideo Pro is safe to use. We use HTTPS encryption, do not store your personal download data, and the service is designed with user privacy in mind.'
    },
    {
      id: 4,
      question: 'Why does video quality vary?',
      answer: 'Video quality depends on the original upload quality on Facebook. We provide the highest available quality, but some videos may already be compressed by Facebook.'
    },
    {
      id: 5,
      question: 'Do I need to install software?',
      answer: 'No. FBVideo Pro is a web-based tool that works directly in your browser on PC, Mac, iPhone, Android, and tablets. No installation is required.'
    },
    {
      id: 6,
      question: 'Which formats are supported?',
      answer: 'We support MP4 (video) in multiple qualities such as 480p, 720p, 1080p, 2K, and 4K, and MP3 (audio) in different bitrates such as 128kbps and 320kbps.'
    },
    {
      id: 7,
      question: 'Will downloaded videos have a watermark?',
      answer: 'No. Downloaded videos do not include an added watermark. You get the original media without extra branding.'
    },
    {
      id: 8,
      question: 'How long does a download take?',
      answer: 'Download time depends on video length and your internet speed. Most downloads complete in seconds to a few minutes.'
    },
    {
      id: 9,
      question: 'Is there a download limit?',
      answer: 'No. You can download videos for free without a fixed monthly limit or mandatory registration.'
    },
    {
      id: 10,
      question: 'Which browsers are supported?',
      answer: 'FBVideo Pro works on all modern browsers, including Chrome, Firefox, Safari, Edge, and Opera, on both desktop and mobile.'
    }
  ];

  return (
    <div className="accordion" id="faqAccordion">
      {faqs.map((faq) => (
        <div className="accordion-item" key={faq.id}>
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${faq.id}`}
              aria-expanded="false"
              aria-controls={`collapse${faq.id}`}
            >
              <i className="bi bi-question-circle me-2 text-primary"></i>
              {faq.question}
            </button>
          </h2>
          <div
            id={`collapse${faq.id}`}
            className="accordion-collapse collapse"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
