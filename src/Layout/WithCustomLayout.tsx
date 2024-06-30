import React, { useState } from 'react';
import { Layout } from 'antd';
import CustomHeader from './CustomHeader';
import CustomSider from './CustomSider';
import CustomContent from './CustomContent';
import CustomFooter from './CustomFooter';

const WithCustomLayout = (WrappedComponent: React.FC) => {
  const HOC: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => setCollapsed(!collapsed);

    return (
      <Layout style={{ height: '100vh' }}>
        <CustomSider collapsed={collapsed} />
        <Layout>
          <CustomHeader collapsed={collapsed} toggleCollapse={toggleCollapse} />
          <CustomContent>
            <WrappedComponent />
          </CustomContent>
          <CustomFooter />
        </Layout>
      </Layout>
    );
  };

  return HOC;
};

export default WithCustomLayout;
