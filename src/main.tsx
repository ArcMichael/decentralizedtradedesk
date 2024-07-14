// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import { IntlProvider } from 'react-intl';
import { messages } from './locales';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import 'antd/dist/reset.css';
import '@/styles/globals.css';

const AppWrapper = () => {
  const { locale } = useLanguage();
  const antLocale = locale === 'zh' ? zhCN : enUS;

  return (
    <ConfigProvider locale={antLocale}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <App />
      </IntlProvider>
    </ConfigProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <LanguageProvider>
      <AppWrapper />
    </LanguageProvider>
  </React.StrictMode>
);
