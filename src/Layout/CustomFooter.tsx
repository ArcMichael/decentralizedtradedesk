import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const CustomFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      © 2024 Created by Your Company
    </Footer>
  );
};

export default CustomFooter;
