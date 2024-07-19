// src/routeConfig.tsx

import React, { lazy } from 'react';
import {
  UserOutlined,
  UploadOutlined,
  // SettingOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute component

/**
 * 管理后台
 */
const AdminProductsPage = lazy(
  () => import('../Pages/Admin/AdminProductsPage')
); // 管理后台-商品管理
const AdminAddProductPage = lazy(
  () => import('../Pages/Admin/AdminAddProductPage')
); // 管理后台-添加商品
const AdminEditProductPage = lazy(
  () => import('../Pages/Admin/AdminEditProductPage')
); // 管理后台-编辑商品
const AdminUsersPage = lazy(() => import('../Pages/Admin/AdminUsersPage')); // 管理后台-用户管理
// const AdminOrdersPage = lazy(() => import('../Pages/Admin/AdminOrdersPage')); // 管理后台-订单管理
// const AdminStatisticsPage = lazy(() => import('../Pages/Admin/AdminStatisticsPage')); // 管理后台-数据统计
const UserWalletPage = lazy(() => import('../Pages/Admin/AdminWalletPage')); // 管理后台-钱包管理

/**
 * 用户个人中心
 */

// const UserOrdersPage = lazy(() => import('../Pages/Dashboard/UserOrdersPage')); // 用户个人中心-订单管理
// const UserProfilePage = lazy(
//   () => import('../Pages/Dashboard/UserProfilePage')
// ); // 用户个人中心-个人资料
// const UserSettingsPage = lazy(
//   () => import('../Pages/Dashboard/UserSettingsPage')
// ); // 用户个人中心-设置

/**
 * 通用页面
 */

const HomePage = lazy(() => import('../Pages/HomePage')); // 首页
const LoginPage = lazy(() => import('../Pages/LoginPage')); // 登录页面
// const RegisterPage = lazy(() => import('../Pages/RegisterPage')); // 注册页面 (不需要注册)
const NotFoundPage = lazy(() => import('../Pages/NotFoundPage')); // 404 页面

const BrowsePage = lazy(() => import('../Pages/BrowsePage')); // 商品浏览页面
const ProductDetailPage = lazy(() => import('../Pages/ProductDetailPage')); // 商品详情页面

export interface RouteConfig {
  path: string;
  element?: React.ReactNode;
  title: string;
  icon: React.ReactNode;
  showInSider: boolean;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  {
    path: '/',
    element: <PrivateRoute element={<HomePage />} />,
    title: 'home',
    icon: <UserOutlined />,
    showInSider: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
    title: 'login',
    icon: <UploadOutlined />,
    showInSider: false,
  },
  {
    path: '/admin',
    title: 'admin',
    icon: <UserOutlined />,
    showInSider: true,
    children: [
      {
        path: '/admin/products',
        element: <PrivateRoute element={<AdminProductsPage />} />,
        title: 'products',
        icon: <UserOutlined />,
        showInSider: true,
      },
      {
        path: '/admin/products/add',
        element: <PrivateRoute element={<AdminAddProductPage />} />, // 新增
        title: 'addProduct',
        icon: <UploadOutlined />,
        showInSider: false,
      },
      {
        path: '/admin/products/edit/:id',
        element: <PrivateRoute element={<AdminEditProductPage />} />, // 新增
        title: 'editProduct',
        icon: <UploadOutlined />,
        showInSider: false,
      },
      {
        path: '/admin/users',
        element: <PrivateRoute element={<AdminUsersPage />} />,
        title: 'users',
        icon: <UserOutlined />,
        showInSider: true,
      },
      {
        path: '/admin/wallet',
        element: <PrivateRoute element={<UserWalletPage />} />,
        title: 'wallet',
        icon: <WalletOutlined />,
        showInSider: true,
      },
      // {
      //   path: '/admin/orders',
      //   element: <PrivateRoute element={<AdminOrdersPage />} />,
      //   title: 'orders',
      //   icon: <UserOutlined />,
      //   showInSider: true,
      // },
      // {
      //   path: '/admin/statistics',
      //   element: <PrivateRoute element={<AdminStatisticsPage />} />,
      //   title: 'statistics',
      //   icon: <UserOutlined />,
      //   showInSider: true,
      // },
    ],
  },
  // {
  //   path: '/dashboard',
  //   title: 'dashboard',
  //   icon: <SettingOutlined />,
  //   showInSider: true,
  //   children: [
  //     {
  //       path: '/dashboard/orders',
  //       element: <PrivateRoute element={<UserOrdersPage />} />,
  //       title: 'orders',
  //       icon: <SettingOutlined />,
  //       showInSider: true,
  //     },
  //     {
  //       path: '/dashboard/profile',
  //       element: <PrivateRoute element={<UserProfilePage />} />,
  //       title: 'profile',
  //       icon: <SettingOutlined />,
  //       showInSider: true,
  //     },
  //     {
  //       path: '/dashboard/settings',
  //       element: <PrivateRoute element={<UserSettingsPage />} />,
  //       title: 'settings',
  //       icon: <SettingOutlined />,
  //       showInSider: true,
  //     },
  //   ],
  // },
  {
    path: '/browse',
    element: <PrivateRoute element={<BrowsePage />} />,
    title: 'browse',
    icon: <UserOutlined />,
    showInSider: true,
  },
  {
    path: '/product/:id',
    element: <PrivateRoute element={<ProductDetailPage />} />,
    title: 'Product Detail',
    icon: <UserOutlined />,
    showInSider: false,
  },
  {
    path: '*',
    element: <NotFoundPage />,
    title: 'notFound',
    icon: <UploadOutlined />,
    showInSider: false,
  },
];

export default routes;
