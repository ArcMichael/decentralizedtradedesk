import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import routeConfig, { RouteConfig } from '../Route/routeConfig';

interface GroupedRoutes {
  [key: string]: RouteConfig[];
}

const renderMenuItems = (routes: RouteConfig[]): MenuProps['items'] => {
  const grouped: GroupedRoutes = routes.reduce((acc: GroupedRoutes, route) => {
    if (!route.showInSider) return acc;
    const group = route.group || ''; // 默认为空字符串，表示无分组
    if (group) {
      if (!acc[group]) acc[group] = [];
      acc[group].push(route);
    } else {
      // 直接将无分组的路由添加到顶级
      acc[route.path] = [route]; // 使用路径作为键，确保唯一性
    }
    return acc;
  }, {});

  return Object.entries(grouped).map(([key, items]) => {
    if (items.length === 1 && key === items[0].path) {
      // 如果只有一个项目并且键与路径相同，直接返回顶级项目
      return {
        key: items[0].path,
        icon: items[0].icon,
        label: items[0].title,
      };
    } else {
      // 否则，创建一个有子菜单的分组
      return {
        key: key,
        label: key,
        icon: items[0].icon,
        children: items.map(route => ({
          key: route.path,
          label: route.title,
          icon: route.icon,
        })),
      };
    }
  });
};

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
