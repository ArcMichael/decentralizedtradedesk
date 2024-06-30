import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import routeConfig, { RouteConfig } from '../Route/routeConfig';

const { Sider } = Layout;

interface CustomSiderProps {
  collapsed: boolean;
}

const renderMenuItems = (
  routes: RouteConfig[],
  parentPath: string = ''
): any[] => {
  return routes
    .map((route: RouteConfig) => {
      if (!route.showInSider) return null;

      const fullPath = `${parentPath}/${route.path}`;
      if (route.subRoutes) {
        return {
          key: fullPath,
          icon: route.icon,
          label: route.title,
          children: renderMenuItems(route.subRoutes, fullPath),
        };
      }
      return {
        key: fullPath,
        icon: route.icon,
        label: route.title,
      };
    })
    .filter(item => item !== null);
};

const CustomSider: React.FC<CustomSiderProps> = ({ collapsed }) => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {
    console.log(`Navigating to: ${key}`);
    navigate(key);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className='demo-logo-vertical' />
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['/']}
        onClick={handleMenuClick}
        items={renderMenuItems(routeConfig)} // Use items instead of children
      />
    </Sider>
  );
};

export default CustomSider;
