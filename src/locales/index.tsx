// src/locales/index.ts

import zhCustomFooter from './zh/CustomFooter.json';
import enCustomFooter from './en/CustomFooter.json';

import zhHomePage from './zh/HomePage.json';
import enHomePage from './en/HomePage.json';

import zhLoginpage from './zh/LoginPage.json';
import enLoginpage from './en/LoginPage.json';

import zhCustomSider from './zh/CustomSider.json';
import enCustomSider from './en/CustomSider.json';

import zhUserMenu from './zh/UserMenu.json';
import enUserMenu from './en/UserMenu.json';

import zhAdminAddProductPage from './zh/AdminAddProductPage.json';
import enAdminAddProductPage from './en/AdminAddProductPage.json';

import zhAdminEditProductPage from './zh/AdminEditProductPage.json';
import enAdminEditProductPage from './en/AdminEditProductPage.json';

import zhAdminProductPage from './zh/AdminProductPage.json';
import enAdminProductPage from './en/AdminProductPage.json';

import zhBrowsePage from './zh/BrowsePage.json';
import enBrowsePage from './en/BrowsePage.json';

import zhProductDetailPage from './zh/ProductDetailPage.json';
import enProductDetailPage from './en/ProductDetailPage.json';

export const messages = {
  zh: {
    ...zhCustomFooter,
    ...zhHomePage,
    ...zhLoginpage,
    ...zhCustomSider,
    ...zhUserMenu,
    ...zhAdminAddProductPage,
    ...zhAdminEditProductPage,
    ...zhAdminProductPage,
    ...zhBrowsePage,
    ...zhProductDetailPage,
  },
  en: {
    ...enCustomFooter,
    ...enHomePage,
    ...enLoginpage,
    ...enCustomSider,
    ...enUserMenu,
    ...enAdminAddProductPage,
    ...enAdminEditProductPage,
    ...enAdminProductPage,
    ...enBrowsePage,
    ...enProductDetailPage,
  },
};

export type Locale = keyof typeof messages;
