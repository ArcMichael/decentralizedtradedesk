// src/Layout/WithSimpleLayout.tsx
import React from 'react';
import { Layout } from 'antd';
import CustomHeader from './CustomHeader';
import CustomContent from './CustomContent';
import CustomFooter from './CustomFooter';

const WithSimpleLayout = (WrappedComponent: React.FC): React.FC => {
  const HOC: React.FC = () => {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <CustomHeader showUserMenu={false} />
        <CustomContent showBreadcrumbs={false}>
          <WrappedComponent />
        </CustomContent>
        <CustomFooter />
      </Layout>
    );
  };

  return HOC;
};

export default WithSimpleLayout;
