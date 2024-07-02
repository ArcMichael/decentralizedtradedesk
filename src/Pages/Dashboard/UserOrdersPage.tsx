// src/Pages/Dashboard/UserOrdersPage.tsx
import React from 'react';
import WithCustomLayout from '../../Layout/WithCustomLayout';
import { Typography } from 'antd';

const { Title } = Typography;

const UserOrdersPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>User Orders Page</Title>
      <p>View and manage your orders from this page.</p>
    </div>
  );
};

export default WithCustomLayout(UserOrdersPage);
