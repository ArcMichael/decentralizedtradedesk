import React from 'react';
import {
  UserOutlined,
  UploadOutlined,
  SettingOutlined,
  WalletOutlined,
} from '@ant-design/icons';

import HomePage from '../Pages/HomePage';
import AdminProductsPage from '../Pages/Admin/AdminProductsPage';
import AdminUsersPage from '../Pages/Admin/AdminUsersPage';
import AdminOrdersPage from '../Pages/Admin/AdminOrdersPage';
import AdminStatisticsPage from '../Pages/Admin/AdminStatisticsPage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import NotFoundPage from '../Pages/NotFoundPage';
import DashboardPage from '../Pages/DashboardPage';
import UserOrdersPage from '../Pages/Dashboard/UserOrdersPage';
import UserProfilePage from '../Pages/Dashboard/UserProfilePage';
import UserSettingsPage from '../Pages/Dashboard/UserSettingsPage';
import UserWalletPage from '../Pages/Dashboard/UserWalletPage';
import BrowsePage from '../Pages/BrowsePage';
import ProductDetailPage from '../Pages/ProductDetailPage';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  group?: string; // 新增 group 属性
  title: string;
  icon: React.ReactNode;
  showInSider: boolean;
}

const routes: RouteConfig[] = [
  {
    path: '/',
    element: <HomePage />,
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
  // 管理员路由组
  {
    path: '/admin/products',
    element: <AdminProductsPage />,
    group: 'Admin',
    title: 'Products',
    icon: <UserOutlined />,
    showInSider: true,
  },
  {
    path: '/admin/users',
    element: <AdminUsersPage />,
    group: 'Admin',
    title: 'Users',
    icon: <UserOutlined />,
    showInSider: true,
  },
  {
    path: '/admin/orders',
    element: <AdminOrdersPage />,
    group: 'Admin',
    title: 'Orders',
    icon: <UserOutlined />,
    showInSider: true,
  },
  {
    path: '/admin/statistics',
    element: <AdminStatisticsPage />,
    group: 'Admin',
    title: 'Statistics',
    icon: <UserOutlined />,
    showInSider: true,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    title: 'Dashboard',
    icon: <SettingOutlined />,
    showInSider: true,
  },
  {
    path: '/dashboard/orders',
    element: <UserOrdersPage />,
    group: 'Dashboard',
    title: 'Orders',
    icon: <SettingOutlined />,
    showInSider: true,
  },
  {
    path: '/dashboard/profile',
    element: <UserProfilePage />,
    group: 'Dashboard',
    title: 'Profile',
    icon: <SettingOutlined />,
    showInSider: true,
  },
  {
    path: '/dashboard/settings',
    element: <UserSettingsPage />,
    group: 'Dashboard',
    title: 'Settings',
    icon: <SettingOutlined />,
    showInSider: true,
  },
  {
    path: '/dashboard/wallet',
    element: <UserWalletPage />,
    group: 'Dashboard',
    title: 'Wallet',
    icon: <WalletOutlined />,
    showInSider: true,
  },
  {
    path: '/browse',
    element: <BrowsePage />,
    title: 'Browse',
    icon: <UserOutlined />,
    showInSider: true,
  },
  {
    path: '/product/:id',
    element: <ProductDetailPage />,
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
