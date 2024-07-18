// Layout/CustomSider.tsx

import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import routeConfig, { RouteConfig } from '../Route/routeConfig';
import { useIntl } from 'react-intl';

const CustomSider: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const navigate = useNavigate();
  const intl = useIntl(); // 使用 useIntl 钩子获取 intl 对象

  const renderMenuItems = (routes: RouteConfig[]): MenuProps['items'] =>
    routes
      .map(route => {
        if (route.children) {
          return {
            key: route.path,
            icon: route.icon,
            label: intl.formatMessage({ id: `customsider.${route.title}` }),
            children: route.children
              .filter(child => child.showInSider) // 过滤子项
              .map(child => ({
                key: child.path,
                icon: child.icon,
                label: intl.formatMessage({ id: `customsider.${child.title}` }),
              })),
          };
        } else if (route.showInSider) {
          return {
            key: route.path,
            icon: route.icon,
            label: intl.formatMessage({ id: `customsider.${route.title}` }),
          };
        } else {
          return null;
        }
      })
      .filter(item => item !== null);

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
