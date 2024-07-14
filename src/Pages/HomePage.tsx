// src/Pages/HomePage.tsx
import React from 'react';
import { Row, Col, Card, Button, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
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
        <Title>
          <FormattedMessage id='homepage.welcomeTitle' />
        </Title>
        <Paragraph>
          <FormattedMessage id='homepage.welcomeParagraph' />
        </Paragraph>
      </header>

      <section>
        <Title level={2}>
          <FormattedMessage id='homepage.aboutUsTitle' />
        </Title>
        <Paragraph>
          <FormattedMessage id='homepage.aboutUsParagraph' />
        </Paragraph>
      </section>

      <section>
        <Title level={2}>
          <FormattedMessage id='homepage.featuresTitle' />
        </Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title={<FormattedMessage id='homepage.marketplaceFeature' />}>
              <Paragraph>
                <FormattedMessage id='homepage.marketplaceDescription' />
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title={
                <FormattedMessage id='homepage.secureTransactionsFeature' />
              }
            >
              <Paragraph>
                <FormattedMessage id='homepage.secureTransactionsDescription' />
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card title={<FormattedMessage id='homepage.interfaceFeature' />}>
              <Paragraph>
                <FormattedMessage id='homepage.interfaceDescription' />
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card title={<FormattedMessage id='homepage.lowFeesFeature' />}>
              <Paragraph>
                <FormattedMessage id='homepage.lowFeesDescription' />
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </section>

      <section>
        <Title level={2}>
          <FormattedMessage id='homepage.missionTitle' />
        </Title>
        <Paragraph>
          <FormattedMessage id='homepage.missionParagraph' />
        </Paragraph>
      </section>

      <section>
        <Title level={2}>
          <FormattedMessage id='homepage.howItWorksTitle' />
        </Title>
        <Paragraph>
          <FormattedMessage id='homepage.howItWorksParagraph' />
        </Paragraph>
      </section>

      <section>
        <Title level={2}>
          <FormattedMessage id='homepage.contactUsTitle' />
        </Title>
        <Paragraph>
          <FormattedMessage id='homepage.contactUsParagraph' />{' '}
          <Button
            type='link'
            icon={<GithubOutlined />}
            onClick={handleContactUsClick}
          >
            <FormattedMessage id='homepage.contactUsTitle' />
          </Button>
        </Paragraph>
      </section>
    </div>
  );
};

export default WithCustomLayout(HomePage);
