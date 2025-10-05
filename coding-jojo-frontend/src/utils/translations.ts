import { Language, Translations } from '../contexts/LanguageContext';

// Cache for loaded translations
const translationCache: Record<Language, Translations | null> = {
  en: null,
  es: null,
  fr: null,
};

/**
 * Load translations for a specific language
 * @param language The language code to load
 * @returns Promise that resolves to the translations object
 */
export async function loadTranslations(language: Language): Promise<Translations> {
  // Return cached translations if available
  if (translationCache[language]) {
    return translationCache[language]!;
  }

  try {
    // In development and production, load from public folder
    const response = await fetch(`/langs/${language}.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${language}: ${response.statusText}`);
    }
    
    const translations = await response.json();
    
    // Cache the translations
    translationCache[language] = translations;
    
    return translations;
  } catch (error) {
    console.error(`Error loading translations for ${language}:`, error);
    
    // Fallback to English if loading fails and current language is not English
    if (language !== 'en') {
      console.log('Falling back to English translations');
      return loadTranslations('en');
    }
    
    // Return empty object if even English fails to load
    return {};
  }
}

/**
 * Clear the translation cache (useful for development)
 */
export function clearTranslationCache(): void {
  Object.keys(translationCache).forEach(key => {
    translationCache[key as Language] = null;
  });
}

/**
 * Preload translations for all supported languages
 * This can be called during app initialization to improve performance
 */
export async function preloadAllTranslations(): Promise<void> {
  const languages: Language[] = ['en', 'es', 'fr'];
  
  try {
    await Promise.all(
      languages.map(lang => loadTranslations(lang))
    );
    console.log('All translations preloaded successfully');
  } catch (error) {
    console.error('Error preloading translations:', error);
  }
}

/**
 * Get the browser's preferred language if it matches our supported languages
 * @returns The detected language or 'en' as fallback
 */
export function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') {
    return 'en'; // Default for server-side rendering
  }

  const browserLanguage = navigator.language.split('-')[0].toLowerCase();
  const supportedLanguages: Language[] = ['en', 'es', 'fr'];
  
  return supportedLanguages.includes(browserLanguage as Language) 
    ? (browserLanguage as Language) 
    : 'en';
}

/**
 * Format time values with proper localization
 * @param value The time value
 * @param language The current language
 * @returns Formatted time string
 */
export function formatTimeValue(value: number, language: Language): string {
  return value.toString().padStart(2, '0');
}
