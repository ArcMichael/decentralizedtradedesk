// src/Layout/CustomFooter.tsx
import React from 'react';
import { Layout, Typography, Row, Col } from 'antd';

const { Footer } = Layout;
const { Title, Paragraph } = Typography;

const CustomFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: 'left', padding: '24px 50px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={2}>Site Map and Features</Title>
          <Paragraph>
            Our platform is structured to provide a seamless experience across
            various functionalities. Here's an overview:
          </Paragraph>
        </Col>
        <Col span={12} md={6}>
          <Title level={4}>General</Title>
          <ul>
            <li>Home</li>
            <li>Login</li>
            <li>Register</li>
          </ul>
        </Col>
        <Col span={12} md={6}>
          <Title level={4}>Admin Panel</Title>
          <ul>
            <li>Products: Add, edit, and manage product listings.</li>
            <li>Users: Manage user accounts and their roles.</li>
            <li>Orders: View and process orders.</li>
            <li>Statistics: Monitor platform performance and metrics.</li>
          </ul>
        </Col>
        <Col span={12} md={6}>
          <Title level={4}>Dashboard</Title>
          <ul>
            <li>Orders: View and manage your orders.</li>
            <li>Profile: Update your personal information.</li>
            <li>Settings: Configure your account settings.</li>
            <li>Wallet: Manage your funds and transactions.</li>
          </ul>
        </Col>
        <Col span={12} md={6}>
          <Title level={4}>Explore</Title>
          <ul>
            <li>Browse</li>
            <li>Product Detail</li>
            <li>Not Found</li>
          </ul>
        </Col>
      </Row>
    </Footer>
  );
};

export default CustomFooter;
