// src/__tests__/routeConfig.test.tsx

import routes, { RouteConfig } from '../Route/routeConfig';
import {
  UserOutlined,
  UploadOutlined,
  SettingOutlined,
  WalletOutlined,
} from '@ant-design/icons';

describe('routeConfig', () => {
  it('should have the correct route configuration', () => {
    const expectedRoutes: RouteConfig[] = [
      {
        path: '/',
        title: 'Home',
        showInSider: true,
        icon: <UserOutlined />,
      },
      {
        path: '/login',
        title: 'Login',
        showInSider: false,
        icon: <UploadOutlined />,
      },
      {
        path: '/admin',
        title: 'Admin',
        showInSider: true,
        icon: <UserOutlined />,
        children: [
          {
            path: '/admin/products',
            title: 'Products',
            showInSider: true,
            icon: <UserOutlined />,
          },
          {
            path: '/admin/users',
            title: 'Users',
            showInSider: true,
            icon: <UserOutlined />,
          },
          {
            path: '/admin/orders',
            title: 'Orders',
            showInSider: true,
            icon: <UserOutlined />,
          },
          {
            path: '/admin/statistics',
            title: 'Statistics',
            showInSider: true,
            icon: <UserOutlined />,
          },
        ],
      },
      {
        path: '/dashboard',
        title: 'Dashboard',
        showInSider: true,
        icon: <SettingOutlined />,
        children: [
          {
            path: '/dashboard/orders',
            title: 'Orders',
            showInSider: true,
            icon: <SettingOutlined />,
          },
          {
            path: '/dashboard/profile',
            title: 'Profile',
            showInSider: true,
            icon: <SettingOutlined />,
          },
          {
            path: '/dashboard/settings',
            title: 'Settings',
            showInSider: true,
            icon: <SettingOutlined />,
          },
          {
            path: '/dashboard/wallet',
            title: 'Wallet',
            showInSider: true,
            icon: <WalletOutlined />,
          },
        ],
      },
      {
        path: '/browse',
        title: 'Browse',
        showInSider: true,
        icon: <UserOutlined />,
      },
      {
        path: '/product/:id',
        title: 'Product Detail',
        showInSider: false,
        icon: <UserOutlined />,
      },
      {
        path: '*',
        title: 'NotFound',
        showInSider: false,
        icon: <UploadOutlined />,
      },
    ];

    expectedRoutes.forEach(route => {
      const foundRoute = routes.find(r => r.path === route.path);
      expect(foundRoute).toBeDefined();
      expect(foundRoute?.title).toBe(route.title);
      expect(foundRoute?.showInSider).toBe(route.showInSider);
      expect(foundRoute?.icon).toEqual(route.icon);
      if (route.children) {
        route.children.forEach(childRoute => {
          const foundChildRoute = foundRoute?.children?.find(
            r => r.path === childRoute.path
          );
          expect(foundChildRoute).toBeDefined();
          expect(foundChildRoute?.title).toBe(childRoute.title);
          expect(foundChildRoute?.showInSider).toBe(childRoute.showInSider);
          expect(foundChildRoute?.icon).toEqual(childRoute.icon);
        });
      }
    });
  });
});
