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
        title: 'home',
        showInSider: true,
        icon: <UserOutlined />,
      },
      {
        path: '/login',
        title: 'login',
        showInSider: false,
        icon: <UploadOutlined />,
      },
      {
        path: '/admin',
        title: 'admin',
        showInSider: true,
        icon: <UserOutlined />,
        children: [
          {
            path: '/admin/products',
            title: 'products',
            showInSider: true,
            icon: <UserOutlined />,
          },
          {
            path: '/admin/users',
            title: 'users',
            showInSider: true,
            icon: <UserOutlined />,
          },
          {
            path: '/admin/orders',
            title: 'orders',
            showInSider: true,
            icon: <UserOutlined />,
          },
          {
            path: '/admin/statistics',
            title: 'statistics',
            showInSider: true,
            icon: <UserOutlined />,
          },
        ],
      },
      {
        path: '/dashboard',
        title: 'dashboard',
        showInSider: true,
        icon: <SettingOutlined />,
        children: [
          {
            path: '/dashboard/orders',
            title: 'orders',
            showInSider: true,
            icon: <SettingOutlined />,
          },
          {
            path: '/dashboard/profile',
            title: 'profile',
            showInSider: true,
            icon: <SettingOutlined />,
          },
          {
            path: '/dashboard/settings',
            title: 'settings',
            showInSider: true,
            icon: <SettingOutlined />,
          },
          {
            path: '/dashboard/wallet',
            title: 'wallet',
            showInSider: true,
            icon: <WalletOutlined />,
          },
        ],
      },
      {
        path: '/browse',
        title: 'browse',
        showInSider: true,
        icon: <UserOutlined />,
      },
      {
        path: '/product/:id',
        title: 'Product Detail', // Updated to match the actual route configuration
        showInSider: false,
        icon: <UserOutlined />,
      },
      {
        path: '*',
        title: 'notFound',
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
