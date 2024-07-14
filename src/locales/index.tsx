import zhCustomContent from './zh/CustomContent.json';
import enCustomContent from './en/CustomContent.json';
import zhHomePage from './zh/HomePage.json';
import enHomePage from './en/HomePage.json';
import zhLoginpage from './zh/Loginpage.json';
import enLoginpage from './en/Loginpage.json';

// src/locales/index.ts
export const messages = {
  zh: {
    ...zhCustomContent,
    ...zhHomePage,
    ...zhLoginpage,
  },
  en: {
    ...enCustomContent,
    ...enHomePage,
    ...enLoginpage,
  },
};

export type Locale = keyof typeof messages;
