// src/Pages/Admin/AdminUsersPage.tsx
import React from 'react';
import WithCustomLayout from '../../Layout/WithCustomLayout';
import { Typography } from 'antd';

const { Title } = Typography;

const AdminUsersPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Admin Users Page</Title>
      <p>Manage all users from this page.</p>
    </div>
  );
};

export default WithCustomLayout(AdminUsersPage);
