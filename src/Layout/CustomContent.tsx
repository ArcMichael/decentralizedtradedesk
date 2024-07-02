import React, { ReactNode } from 'react';
import { Layout, theme } from 'antd';
import Breadcrumbs from '../Components/Breadcrumbs';

const { Content } = Layout;

interface CustomContentProps {
  children: ReactNode;
}

const CustomContent: React.FC<CustomContentProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Breadcrumbs />
      {children}
    </Content>
  );
};

export default CustomContent;
