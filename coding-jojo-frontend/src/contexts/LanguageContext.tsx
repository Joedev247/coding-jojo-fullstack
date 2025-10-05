'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loadTranslations, detectBrowserLanguage } from '../utils/translations';

// Define supported languages
export type Language = 'en' | 'es' | 'fr';

// Language options for the dropdown
export const languageOptions = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' }
];

// Define translation keys and their values
export interface Translations {
  [key: string]: string | Translations;
}

// Define context type
export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  translations: Translations;
  loading: boolean;
}

// Create context
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language provider props
interface LanguageProviderProps {
  children: ReactNode;
}

// Language provider component
export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>({});
  const [loading, setLoading] = useState<boolean>(true);

  // Load translations using the utility function
  const loadLanguageTranslations = async (lang: Language) => {
    setLoading(true);
    try {
      const data = await loadTranslations(lang);
      setTranslations(data);
    } catch (error) {
      console.error('Error loading translations in context:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load translations when language changes
  useEffect(() => {
    loadLanguageTranslations(language);
  }, [language]);

  // Load initial language from localStorage or detect browser language
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && languageOptions.find(opt => opt.code === savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const detectedLanguage = detectBrowserLanguage();
      setLanguage(detectedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('preferred-language', newLanguage);
  };

  // Translation function
  // Translation function
  const t = (key: string): string => {
    if (loading || !translations) {
      return key; // Return key while loading
    }

    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const contextValue: LanguageContextType = {
    language,
    setLanguage: handleSetLanguage,
    t,
    translations,
    loading
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
}

// Export useTranslation as an alias for useLanguage for compatibility
export const useTranslation = useLanguage;
