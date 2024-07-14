// src/Layout/CustomFooter.tsx
import React from 'react';
import { Layout, Typography, Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';

const { Footer } = Layout;
const { Title, Paragraph } = Typography;

const CustomFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: 'left', padding: '24px 50px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={2}>
            <FormattedMessage id='siteMapAndFeatures' />
          </Title>
          <Paragraph>
            <FormattedMessage id='overview' />
          </Paragraph>
        </Col>
        <Col span={12} md={6}>
          <Title level={4}>
            <FormattedMessage id='general' />
          </Title>
          <ul>
            <li>
              <FormattedMessage id='home' />
            </li>
            <li>
              <FormattedMessage id='login' />
            </li>
          </ul>
        </Col>
        <Col span={12} md={6}>
          <Title level={4}>
            <FormattedMessage id='adminPanel' />
          </Title>
          <ul>
            <li>
              <FormattedMessage id='products' />
            </li>
            <li>
              <FormattedMessage id='users' />
            </li>
            <li>
              <FormattedMessage id='orders' />
            </li>
            <li>
              <FormattedMessage id='statistics' />
            </li>
          </ul>
        </Col>
        <Col span={12} md={6}>
          <Title level={4}>
            <FormattedMessage id='dashboard' />
          </Title>
          <ul>
            <li>
              <FormattedMessage id='viewOrders' />
            </li>
            <li>
              <FormattedMessage id='profile' />
            </li>
            <li>
              <FormattedMessage id='settings' />
            </li>
            <li>
              <FormattedMessage id='wallet' />
            </li>
          </ul>
        </Col>
        <Col span={12} md={6}>
          <Title level={4}>
            <FormattedMessage id='explore' />
          </Title>
          <ul>
            <li>
              <FormattedMessage id='browse' />
            </li>
            <li>
              <FormattedMessage id='productDetail' />
            </li>
            <li>
              <FormattedMessage id='notFound' />
            </li>
          </ul>
        </Col>
      </Row>
    </Footer>
  );
};

export default CustomFooter;
