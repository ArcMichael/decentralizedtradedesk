// src/Route/routeConfig.tsx
import React from 'react';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import HomePage from '../Pages/HomePage';
import WelcomePage from '../Pages/WelcomePage';
import NotFoundPage from '../Pages/NotFoundPage';
import DashboardPage from '../Pages/DashboardPage';
import AdminPanelPage from '../Pages/AdminPanelPage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  exact?: boolean;
  subRoutes?: RouteConfig[];
  title?: string;
  icon?: React.ReactNode;
  showInSider?: boolean;
}

const routes: RouteConfig[] = [
  {
    path: '/',
    element: <HomePage />,
    exact: true,
    title: 'Home',
    icon: <UserOutlined />,
    showInSider: false,
  },
  {
    path: 'welcome',
    element: <WelcomePage />,
    title: 'Welcome',
    icon: <VideoCameraOutlined />,
    showInSider: true,
  },
  {
    path: 'login',
    element: <LoginPage />,
    title: 'Login',
    icon: <UploadOutlined />,
    showInSider: false,
  },
  {
    path: 'register',
    element: <RegisterPage />,
    title: 'Register',
    icon: <UploadOutlined />,
    showInSider: false,
  },
  {
    path: 'dashboard',
    element: <DashboardPage />,
    title: 'Dashboard',
    icon: <UserOutlined />,
    showInSider: true,
  },
  {
    path: 'admin',
    element: <AdminPanelPage />,
    title: 'Admin',
    icon: <VideoCameraOutlined />,
    showInSider: true,
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
