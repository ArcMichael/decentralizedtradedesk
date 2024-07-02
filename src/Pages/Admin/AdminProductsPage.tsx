// src/Pages/Admin/AdminProductsPage.tsx
import React from 'react';
import WithCustomLayout from '../../Layout/WithCustomLayout';
import { Typography } from 'antd';

const { Title } = Typography;

const AdminProductsPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Admin Products Page</Title>
      <p>Manage all products from this page.</p>
    </div>
  );
};

export default WithCustomLayout(AdminProductsPage);
