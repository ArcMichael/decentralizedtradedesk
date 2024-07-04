// src/routeConfig.tsx

import React, { lazy } from 'react';
import {
  UserOutlined,
  UploadOutlined,
  SettingOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute component

const HomePage = lazy(() => import('../Pages/HomePage'));
const AdminProductsPage = lazy(
  () => import('../Pages/Admin/AdminProductsPage')
);
const AdminAddProductPage = lazy(
  () => import('../Pages/Admin/AdminAddProductPage')
); // 新增
const AdminEditProductPage = lazy(
  () => import('../Pages/Admin/AdminEditProductPage')
); // 新增
const AdminUsersPage = lazy(() => import('../Pages/Admin/AdminUsersPage'));
const AdminOrdersPage = lazy(() => import('../Pages/Admin/AdminOrdersPage'));
const AdminStatisticsPage = lazy(
  () => import('../Pages/Admin/AdminStatisticsPage')
);
const LoginPage = lazy(() => import('../Pages/LoginPage'));
const RegisterPage = lazy(() => import('../Pages/RegisterPage'));
const NotFoundPage = lazy(() => import('../Pages/NotFoundPage'));
const UserOrdersPage = lazy(() => import('../Pages/Dashboard/UserOrdersPage'));
const UserProfilePage = lazy(
  () => import('../Pages/Dashboard/UserProfilePage')
);
const UserSettingsPage = lazy(
  () => import('../Pages/Dashboard/UserSettingsPage')
);
const UserWalletPage = lazy(() => import('../Pages/Dashboard/UserWalletPage'));
const BrowsePage = lazy(() => import('../Pages/BrowsePage'));
const ProductDetailPage = lazy(() => import('../Pages/ProductDetailPage'));

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
    path: '/register',
    element: <RegisterPage />,
    title: 'Register',
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
