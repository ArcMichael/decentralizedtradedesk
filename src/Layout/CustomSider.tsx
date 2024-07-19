import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import routeConfig, { RouteConfig } from '../Route/routeConfig';
import { useIntl } from 'react-intl';
import { useSider } from '../contexts/SiderContext';

const CustomSider: React.FC = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { collapsed, selectedKey, setSelectedKey, openKeys, setOpenKeys } =
    useSider();

  const renderMenuItems = (routes: RouteConfig[]): MenuProps['items'] =>
    routes
      .map(route => {
        if (route.children) {
          return {
            key: route.path,
            icon: route.icon,
            label: intl.formatMessage({ id: `customsider.${route.title}` }),
            children: route.children
              .filter(child => child.showInSider)
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
    setSelectedKey(key);
    navigate(key);
  };

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 0,
        bottom: 0,
        transition: 'width 0.2s',
      }}
    >
      <Menu
        theme='dark'
        mode='inline'
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        items={renderMenuItems(routeConfig)}
        onClick={handleMenuClick}
        onOpenChange={handleOpenChange}
      />
    </Layout.Sider>
  );
};

export default CustomSider;
