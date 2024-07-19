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
            <FormattedMessage id='customfooter.siteMapAndFeatures' />
          </Title>
          <Paragraph>
            <FormattedMessage id='customfooter.overview' />
          </Paragraph>
        </Col>
        <Col span={24} md={8}>
          <Title level={4}>
            <FormattedMessage id='customfooter.general' />
          </Title>
          <ul>
            <li>
              <FormattedMessage id='customfooter.home' />
            </li>
            <li>
              <FormattedMessage id='customfooter.login' />
            </li>
          </ul>
        </Col>
        <Col span={24} md={8}>
          <Title level={4}>
            <FormattedMessage id='customfooter.adminPanel' />
          </Title>
          <ul>
            <li>
              <FormattedMessage id='customfooter.products' />
            </li>
            <li>
              <FormattedMessage id='customfooter.users' />
            </li>
            <li>
              <FormattedMessage id='customfooter.wallet' />
            </li>
            {/* <li>
              <FormattedMessage id='customfooter.orders' />
            </li>
            <li>
              <FormattedMessage id='customfooter.statistics' />
            </li> */}
          </ul>
        </Col>
        {/* <Col span={12} md={6}>
          <Title level={4}>
            <FormattedMessage id='customfooter.dashboard' />
          </Title>
          <ul>
            <li>
              <FormattedMessage id='customfooter.viewOrders' />
            </li>
            <li>
              <FormattedMessage id='customfooter.profile' />
            </li>
            <li>
              <FormattedMessage id='customfooter.settings' />
            </li>

          </ul>
        </Col> */}
        <Col span={24} md={8}>
          <Title level={4}>
            <FormattedMessage id='customfooter.explore' />
          </Title>
          <ul>
            <li>
              <FormattedMessage id='customfooter.browse' />
            </li>
            <li>
              <FormattedMessage id='customfooter.productDetail' />
            </li>
            <li>
              <FormattedMessage id='customfooter.notFound' />
            </li>
          </ul>
        </Col>
      </Row>
    </Footer>
  );
};

export default CustomFooter;
