// src/Pages/Dashboard/UserSettingsPage.tsx
import React from 'react';
import WithCustomLayout from '../../Layout/WithCustomLayout';
import { Typography } from 'antd';

const { Title } = Typography;

const UserSettingsPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>User Settings Page</Title>
      <p>Configure your account settings from this page.</p>
    </div>
  );
};

export default WithCustomLayout(UserSettingsPage);
