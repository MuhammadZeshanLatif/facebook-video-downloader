import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'ar', name: 'العربية' },
    { code: 'cs', name: 'čeština' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'it', name: 'Italiano' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'pl', name: 'Polski' },
    { code: 'pt', name: 'Português' },
    { code: 'ro', name: 'Română' },
    { code: 'ru', name: 'Русский' },
    { code: 'th', name: 'ภาษาไทย' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'uk', name: 'Українська' },
    { code: 'zh', name: '简体中文' },
    { code: 'zh-TW', name: '繁體中文' },
    { code: 'ms', name: 'Bahasa Malaysia' },
    { code: 'hu', name: 'Magyar' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'el', name: 'Ελληνικά' },
    { code: 'he', name: 'עברית' },
    { code: 'fa', name: 'فارسی' },
    { code: 'nb', name: 'Norsk Bokmål' },
    { code: 'sv', name: 'Svenska' },
    { code: 'fi', name: 'Suomi' }
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    // Get current path and replace language code
    const currentPath = window.location.pathname;
    const newPath = `/${langCode}${currentPath.replace(/^\/[a-z]{2}(?:-[a-z]{2})?/i, '')}`;
    navigate(newPath);
    setIsOpen(false);
  };

  const currentLang = languages.find(l => l.code === i18n.language);

  return (
    <div className="dropdown d-inline-block">
      <button
        className="btn btn-sm btn-outline-primary dropdown-toggle"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title="Select Language"
      >
        <i className="bi bi-globe me-2"></i>
        {currentLang?.name || 'English'}
      </button>
      <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} style={{ 
        display: isOpen ? 'block' : 'none',
        maxHeight: '300px',
        overflowY: 'auto',
        minWidth: '200px'
      }}>
        {languages.map(lang => (
          <button
            key={lang.code}
            className={`dropdown-item ${i18n.language === lang.code ? 'active' : ''}`}
            onClick={() => handleLanguageChange(lang.code)}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
