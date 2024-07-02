// src/Pages/Dashboard/UserWalletPage.tsx
import React from 'react';
import WithCustomLayout from '../../Layout/WithCustomLayout';
import { Typography } from 'antd';

const { Title } = Typography;

const UserWalletPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>User Wallet Page</Title>
      <p>Manage your wallet and transactions from this page.</p>
    </div>
  );
};

export default WithCustomLayout(UserWalletPage);
