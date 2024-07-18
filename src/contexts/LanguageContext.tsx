// src/contexts/LanguageContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export type Locale = 'en' | 'zh';

interface LanguageContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const savedLocale = sessionStorage.getItem('locale') as Locale;
    return savedLocale || 'zh';
  });

  const setLocale = (locale: Locale) => {
    sessionStorage.setItem('locale', locale);
    setLocaleState(locale);
  };

  useEffect(() => {
    const savedLocale = sessionStorage.getItem('locale') as Locale;
    if (savedLocale && savedLocale !== locale) {
      setLocaleState(savedLocale);
    }
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};
