export default function FAQAccordion() {
  const faqs = [
    {
      id: 1,
      question: '¿Es legal descargar videos de Facebook?',
      answer: 'Descargar videos de Facebook para uso personal es generalmente legal. Sin embargo, debes respetar los derechos de autor y no distribuir contenido protegido sin permiso. Asegúrate siempre de tener los derechos para descargar y usar el contenido.'
    },
    {
      id: 2,
      question: '¿Puedo descargar videos privados de Facebook?',
      answer: 'Nuestra herramienta estándar descarga videos públicos. Para videos privados, puedes usar nuestra función Descargador Privado si eres amigo del propietario o tienes permiso. Siempre respeta la configuración de privacidad.'
    },
    {
      id: 3,
      question: '¿Es seguro usar esta herramienta?',
      answer: 'Sí, FBVideo Pro es 100% seguro. Usamos encriptación HTTPS, no almacenamos datos y no contiene malware. Tu privacidad es nuestra prioridad principal.'
    },
    {
      id: 4,
      question: '¿Por qué varía la calidad del video?',
      answer: 'La calidad del video depende de la calidad de carga original en Facebook. Descargamos la calidad más alta disponible. Algunos videos pueden estar comprimidos por Facebook, lo que afecta la calidad final.'
    },
    {
      id: 5,
      question: '¿Necesito instalar software?',
      answer: 'No, FBVideo Pro es una herramienta basada en web. Funciona directamente en tu navegador en cualquier dispositivo: PC, Mac, iPhone, Android o tablet. No necesita instalación.'
    },
    {
      id: 6,
      question: '¿Qué formatos son compatibles?',
      answer: 'Soportamos MP4 (formato de video) en varias calidades (480p, 720p, 1080p, 2K, 4K) y MP3 (formato de audio) en diferentes velocidades de bits (128kbps, 320kbps).'
    },
    {
      id: 7,
      question: '¿Habrá marca de agua en los videos descargados?',
      answer: 'No, los videos descargados no tienen marca de agua. Obtienes el video original sin marcas adicionales ni branding.'
    },
    {
      id: 8,
      question: '¿Cuánto tiempo tarda la descarga?',
      answer: 'Los tiempos de descarga dependen de la duración del video y tu velocidad de internet. Generalmente, los videos se descargan en segundos a unos pocos minutos. Nuestros servidores CDN aseguran velocidad global rápida.'
    },
    {
      id: 9,
      question: '¿Hay límite de descargas?',
      answer: 'No, descarga videos ilimitados de forma gratuita. No hay cuota mensual ni requisito de registro.'
    },
    {
      id: 10,
      question: '¿Cuál navegadores están soportados?',
      answer: 'FBVideo Pro funciona en todos los navegadores modernos: Chrome, Firefox, Safari, Edge y Opera. Compatible con navegadores de escritorio y móvil.'
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
