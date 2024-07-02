// src/Pages/Admin/AdminStatisticsPage.tsx
import React from 'react';
import WithCustomLayout from '../../Layout/WithCustomLayout';
import { Typography } from 'antd';

const { Title } = Typography;

const AdminStatisticsPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Admin Statistics Page</Title>
      <p>View statistics and performance metrics from this page.</p>
    </div>
  );
};

export default WithCustomLayout(AdminStatisticsPage);
