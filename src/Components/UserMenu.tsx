import React from 'react';
import { Dropdown, Avatar, MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

const UserMenu: React.FC = () => {
  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logged out');
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
        <span style={{ marginLeft: '8px' }}>Username</span>
      </div>
    </Dropdown>
  );
};

export default UserMenu;
