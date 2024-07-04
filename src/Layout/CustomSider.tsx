// Layout/CustomSider.tsx

import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import routeConfig, { RouteConfig } from '../Route/routeConfig';

const renderMenuItems = (routes: RouteConfig[]): MenuProps['items'] =>
  routes
    .map(route => {
      if (route.children) {
        return {
          key: route.path,
          icon: route.icon,
          label: route.title,
          children: route.children
            .filter(child => child.showInSider) // 过滤子项
            .map(child => ({
              key: child.path,
              icon: child.icon,
              label: child.title,
            })),
        };
      } else if (route.showInSider) {
        return {
          key: route.path,
          icon: route.icon,
          label: route.title,
        };
      } else {
        return null;
      }
    })
    .filter(item => item !== null);

const CustomSider: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <Menu
        theme='dark'
        mode='inline'
        items={renderMenuItems(routeConfig)}
        onClick={handleMenuClick}
      />
    </Layout.Sider>
  );
};

export default CustomSider;
