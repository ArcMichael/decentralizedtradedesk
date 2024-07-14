// src/locales/index.tsx

import zhCustomFooter from './zh/CustomFooter.json';
import enCustomFooter from './en/CustomFooter.json';
import zhHomePage from './zh/HomePage.json';
import enHomePage from './en/HomePage.json';
import zhLoginpage from './zh/Loginpage.json';
import enLoginpage from './en/Loginpage.json';
import zhCustomSider from './zh/CustomSider.json';
import enCustomSider from './en/CustomSider.json';

// src/locales/index.ts
export const messages = {
  zh: {
    ...zhCustomFooter,
    ...zhHomePage,
    ...zhLoginpage,
    ...zhCustomSider,
  },
  en: {
    ...enCustomFooter,
    ...enHomePage,
    ...enLoginpage,
    ...enCustomSider,
  },
};

export type Locale = keyof typeof messages;
