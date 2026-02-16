import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './translations.json';

// Get language from URL path
const getLanguageFromPath = () => {
  const path = window.location.pathname;
  const match = path.match(/\/([a-z]{2}(?:-[a-z]{2})?)\/?/i);
  if (match) {
    const matched = match[1];
    const normalized = Object.keys(translations).find(
      (lang) => lang.toLowerCase() === matched.toLowerCase()
    );
    if (normalized) {
      return normalized;
    }
  }
  return 'en';
};

const resources = Object.fromEntries(
  Object.entries(translations).map(([lang, data]) => [lang, { translation: data }])
);

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getLanguageFromPath(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
