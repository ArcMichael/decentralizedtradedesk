// src/Components/UserMenu.tsx
import React from 'react';
import { Dropdown, Avatar, MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useUser } from '../contexts/UserContext'; // Import useUser from your context

const UserMenu: React.FC = () => {
  const { user, logout } = useUser(); // Get user and logout function from context

  const handleLogout = () => {
    logout(); // Implement the logout function from context
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

  // Function to truncate Ethereum address
  const getTruncatedAddress = (address: string) => {
    return `${address.substring(0, 8)}...`; // Truncate and append ellipsis
  };

  return (
    <Dropdown menu={{ items: menuItems }} trigger={['hover']}>
      <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <Avatar icon={<UserOutlined />} />
        {/* Display the Ethereum address if available, else show "Username" */}
        <span style={{ marginLeft: '8px' }}>
          {user ? getTruncatedAddress(user.address) : 'Username'}
        </span>
      </div>
    </Dropdown>
  );
};

export default UserMenu;
