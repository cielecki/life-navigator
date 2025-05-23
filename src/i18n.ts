import i18next, { TOptions } from 'i18next';
import en from './locales/en.json';
import pl from './locales/pl.json';
import { App } from 'obsidian';

export const initI18n = async (app: App) => {
  // Get Obsidian's language setting from localStorage
  const obsidianLang = window.localStorage.getItem('language') || 'en';
  console.log('Obsidian language setting from localStorage:', obsidianLang);
  
  // Map Obsidian's language codes to our supported languages
  const langMap: Record<string, string> = {
    'en': 'en',
    'pl': 'pl',
    'en-US': 'en',
    'pl-PL': 'pl',
    // Add more mappings as needed
  };
  const initialLang = langMap[obsidianLang] || 'en';
  console.log('Mapped to plugin language:', initialLang);

  await i18next.init({
    resources: {
      en: { translation: en },
      pl: { translation: pl }
    },
    lng: initialLang, // Set initial language based on Obsidian's setting
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

  // Force the language to match Obsidian's setting
  await i18next.changeLanguage(initialLang);

  // Listen for language changes in localStorage
  window.addEventListener('storage', (event) => {
    if (event.key === 'language' && event.newValue) {
      const newLang = event.newValue;
      console.log('Language changed in Obsidian:', newLang);
      const mappedLang = langMap[newLang] || 'en';
      i18next.changeLanguage(mappedLang);
    }
  });

  return i18next;
};

export const t = (key: string, options?: TOptions) => {
  return i18next.t(key, options);
};

export const changeLanguage = async (lang: string) => {
  await i18next.changeLanguage(lang);
}; 