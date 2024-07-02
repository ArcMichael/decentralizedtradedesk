// src/Layout/CustomHeader.tsx

import React from 'react';
import { Button, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import UserMenu from '../Components/UserMenu';

const { Header } = Layout;

interface CustomHeaderProps {
  collapsed?: boolean;
  toggleCollapse?: () => void;
  showUserMenu?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  collapsed,
  toggleCollapse,
  showUserMenu = true,
}) => {
  return (
    <Header
      style={{
        padding: 0,
        background: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        {toggleCollapse && (
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapse}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        )}
      </div>
      {showUserMenu && (
        <div style={{ marginRight: '16px' }}>
          <UserMenu />
        </div>
      )}
    </Header>
  );
};

export default CustomHeader;
