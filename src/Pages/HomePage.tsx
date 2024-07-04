// src/Pages/HomePage.tsx
import React from 'react';
import { Row, Col, Card, Button, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import WithCustomLayout from '../Layout/WithCustomLayout';
import { openExternalLink } from '../utils/utils'; // Import the utility function

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const handleContactUsClick = () => {
    const url = 'https://github.com/ArcMichael/decentralizedtradedesk/issues';
    openExternalLink(url);
  };

  return (
    <div style={{ padding: '24px' }}>
      <header>
        <Title>Welcome to Our Decentralized Trading Platform</Title>
        <Paragraph>
          Empowering peer-to-peer transactions with blockchain technology.
        </Paragraph>
      </header>

      <section>
        <Title level={2}>About Us</Title>
        <Paragraph>
          Our platform leverages the power of blockchain to create a secure,
          transparent, and efficient marketplace for trading goods. Whether
          you're looking to buy or sell, our decentralized approach ensures that
          your transactions are protected and fair.
        </Paragraph>
      </section>

      <section>
        <Title level={2}>Key Features</Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title='Decentralized Marketplace'>
              <Paragraph>
                Trade directly with others without the need for intermediaries.
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card title='Secure Transactions'>
              <Paragraph>
                Smart contracts ensure that funds are released only when all
                conditions are met.
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card title='User-Friendly Interface'>
              <Paragraph>
                Our intuitive design makes it easy for anyone to use, regardless
                of their technical expertise.
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card title='Low Fees'>
              <Paragraph>
                Avoid high transaction fees typically associated with
                centralized platforms.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </section>

      <section>
        <Title level={2}>Our Mission</Title>
        <Paragraph>
          Our mission is to democratize the trading of goods by removing
          barriers and providing a platform that is accessible, secure, and
          transparent. We believe in the power of blockchain to create a more
          equitable marketplace for everyone.
        </Paragraph>
      </section>

      <section>
        <Title level={2}>How It Works</Title>
        <Paragraph>
          Our platform uses smart contracts written in Solidity to automate and
          enforce transaction terms. By using Ganache for local blockchain
          development and testing, we ensure that our contracts are secure and
          reliable before deploying them to the main network. The Tauri
          framework allows us to package our web-based interface into a
          lightweight desktop application, providing a seamless user experience.
        </Paragraph>
      </section>

      <section>
        <Title level={2}>Contact Us</Title>
        <Paragraph>
          Have questions or need more information?{' '}
          <Button
            type='link'
            icon={<GithubOutlined />}
            onClick={handleContactUsClick}
          >
            Contact us
          </Button>{' '}
          and we'll be happy to assist you!
        </Paragraph>
      </section>
    </div>
  );
};

export default WithCustomLayout(HomePage);
