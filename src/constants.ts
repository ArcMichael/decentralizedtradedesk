// src/constants.ts

import { MenuProps } from 'antd';
import { ProductData } from './interfaces';

export const menuItems: MenuProps['items'] = [
  {
    label: '购买后，本商品可用于商业目的，包括广告和市场推广。',
    key: '购买后，本商品可用于商业目的，包括广告和市场推广。',
  },
  {
    label: '禁止修改本商品或创作衍生作品。',
    key: '禁止修改本商品或创作衍生作品。',
  },
  {
    label: '本商品可用于非商业的教育目的。',
    key: '本商品可用于非商业的教育目的。',
  },
  {
    label: '允许在公共场合展示本商品，不得用于商业活动。',
    key: '允许在公共场合展示本商品，不得用于商业活动。',
  },
  {
    label: '本商品可用于数字媒体形式，如网站和社交媒体平台。',
    key: '本商品可用于数字媒体形式，如网站和社交媒体平台。',
  },
  {
    label: '不得将本商品用于创建物理产品。',
    key: '不得将本商品用于创建物理产品。',
  },
  {
    label: '本商品仅供个人使用，不得进行商业再销售。',
    key: '本商品仅供个人使用，不得进行商业再销售。',
  },
];

export const initialProductState: ProductData = {
  productId: '',
  name: '',
  description: '',
  price: 0,
  metadata: {
    category: '',
    tags: [],
    imageUrl: '',
  },
  currentOwner: '',
  creator: '',
  transactionConditions: {
    fixedPricePayment: false,
  },
  copyrightUsageRules: '购买后，本商品可用于商业目的，包括广告和市场推广。',
  currency: 'ETH',
  hash: '',
  digitalSignature: '',
  createdAt: '',
  authorizationRecord: null,
};

export const defaultImage = '/vite.svg';
