import React from 'react';
import { Layout } from 'antd';
import CustomHeader from './CustomHeader';
import CustomSider from './CustomSider';
import CustomContent from './CustomContent';
import CustomFooter from './CustomFooter';
import { useSider } from '../contexts/SiderContext';

const WithCustomLayout = (WrappedComponent: React.FC) => {
  const HOC: React.FC = () => {
    const { collapsed } = useSider();
    const siderWidth = collapsed ? 80 : 200; // 根据侧边栏的实际宽度调整此值

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <CustomSider />
        <Layout
          style={{ marginLeft: siderWidth, transition: 'margin-left 0.2s' }}
        >
          <CustomHeader />
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
