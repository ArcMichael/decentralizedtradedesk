// src/Pages/Admin/AdminOrdersPage.tsx
import React from 'react';
import WithCustomLayout from '../../Layout/WithCustomLayout';
import { Typography } from 'antd';

const { Title } = Typography;

const AdminOrdersPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Admin Orders Page</Title>
      <p>Manage all orders from this page.</p>
    </div>
  );
};

export default WithCustomLayout(AdminOrdersPage);
