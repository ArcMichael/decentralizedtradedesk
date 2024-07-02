// src/Pages/Dashboard/UserProfilePage.tsx
import React from 'react';
import WithCustomLayout from '../../Layout/WithCustomLayout';
import { Typography } from 'antd';

const { Title } = Typography;

const UserProfilePage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>User Profile Page</Title>
      <p>View and edit your profile information from this page.</p>
    </div>
  );
};

export default WithCustomLayout(UserProfilePage);
