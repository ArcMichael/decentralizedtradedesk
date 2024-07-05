// src/routeConfig.tsx

import React, { lazy } from 'react';
import {
  UserOutlined,
  UploadOutlined,
  SettingOutlined,
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
const AdminOrdersPage = lazy(() => import('../Pages/Admin/AdminOrdersPage')); // 管理后台-订单管理
const AdminStatisticsPage = lazy(
  () => import('../Pages/Admin/AdminStatisticsPage')
); // 管理后台-数据统计

/**
 * 用户个人中心
 */

const UserOrdersPage = lazy(() => import('../Pages/Dashboard/UserOrdersPage')); // 用户个人中心-订单管理
const UserProfilePage = lazy(
  () => import('../Pages/Dashboard/UserProfilePage')
); // 用户个人中心-个人资料
const UserSettingsPage = lazy(
  () => import('../Pages/Dashboard/UserSettingsPage')
); // 用户个人中心-设置
const UserWalletPage = lazy(() => import('../Pages/Dashboard/UserWalletPage')); // 用户个人中心-钱包管理

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
    title: 'Home',
    icon: <UserOutlined />,
    showInSider: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
    title: 'Login',
    icon: <UploadOutlined />,
    showInSider: false,
  },
  {
    path: '/admin',
    title: 'Admin',
    icon: <UserOutlined />,
    showInSider: true,
    children: [
      {
        path: '/admin/products',
        element: <PrivateRoute element={<AdminProductsPage />} />,
        title: 'Products',
        icon: <UserOutlined />,
        showInSider: true,
      },
      {
        path: '/admin/products/add',
        element: <PrivateRoute element={<AdminAddProductPage />} />, // 新增
        title: 'Add Product',
        icon: <UploadOutlined />,
        showInSider: false,
      },
      {
        path: '/admin/products/edit/:id',
        element: <PrivateRoute element={<AdminEditProductPage />} />, // 新增
        title: 'Edit Product',
        icon: <UploadOutlined />,
        showInSider: false,
      },
      {
        path: '/admin/users',
        element: <PrivateRoute element={<AdminUsersPage />} />,
        title: 'Users',
        icon: <UserOutlined />,
        showInSider: true,
      },
      {
        path: '/admin/orders',
        element: <PrivateRoute element={<AdminOrdersPage />} />,
        title: 'Orders',
        icon: <UserOutlined />,
        showInSider: true,
      },
      {
        path: '/admin/statistics',
        element: <PrivateRoute element={<AdminStatisticsPage />} />,
        title: 'Statistics',
        icon: <UserOutlined />,
        showInSider: true,
      },
    ],
  },
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: <SettingOutlined />,
    showInSider: true,
    children: [
      {
        path: '/dashboard/orders',
        element: <PrivateRoute element={<UserOrdersPage />} />,
        title: 'Orders',
        icon: <SettingOutlined />,
        showInSider: true,
      },
      {
        path: '/dashboard/profile',
        element: <PrivateRoute element={<UserProfilePage />} />,
        title: 'Profile',
        icon: <SettingOutlined />,
        showInSider: true,
      },
      {
        path: '/dashboard/settings',
        element: <PrivateRoute element={<UserSettingsPage />} />,
        title: 'Settings',
        icon: <SettingOutlined />,
        showInSider: true,
      },
      {
        path: '/dashboard/wallet',
        element: <PrivateRoute element={<UserWalletPage />} />,
        title: 'Wallet',
        icon: <WalletOutlined />,
        showInSider: true,
      },
    ],
  },
  {
    path: '/browse',
    element: <PrivateRoute element={<BrowsePage />} />,
    title: 'Browse',
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
    title: 'NotFound',
    icon: <UploadOutlined />,
    showInSider: false,
  },
];

export default routes;
