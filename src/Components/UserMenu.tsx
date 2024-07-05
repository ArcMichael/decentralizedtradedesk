// src/Components/UserMenu.tsx

import React from 'react';
import { Dropdown, Avatar, MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const UserMenu: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    console.log('Logged out');
    navigate('/login');
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <UserOutlined />,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown menu={{ items: menuItems }} trigger={['hover']}>
      <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <Avatar icon={<UserOutlined />} />
        <span
          style={{
            marginLeft: '8px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '200px',
          }}
        >
          {user ? user.address : 'Username'}
        </span>
      </div>
    </Dropdown>
  );
};

export default UserMenu;
