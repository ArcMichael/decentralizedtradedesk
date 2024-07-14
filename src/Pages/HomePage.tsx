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
          <FormattedMessage id='welcomeTitle' />
        </Title>
        <Paragraph>
          <FormattedMessage id='welcomeParagraph' />
        </Paragraph>
      </header>

      <section>
        <Title level={2}>
          <FormattedMessage id='aboutUsTitle' />
        </Title>
        <Paragraph>
          <FormattedMessage id='aboutUsParagraph' />
        </Paragraph>
      </section>

      <section>
        <Title level={2}>
          <FormattedMessage id='featuresTitle' />
        </Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title={<FormattedMessage id='marketplaceFeature' />}>
              <Paragraph>
                <FormattedMessage id='marketplaceDescription' />
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card title={<FormattedMessage id='secureTransactionsFeature' />}>
              <Paragraph>
                <FormattedMessage id='secureTransactionsDescription' />
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card title={<FormattedMessage id='interfaceFeature' />}>
              <Paragraph>
                <FormattedMessage id='interfaceDescription' />
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card title={<FormattedMessage id='lowFeesFeature' />}>
              <Paragraph>
                <FormattedMessage id='lowFeesDescription' />
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </section>

      <section>
        <Title level={2}>
          <FormattedMessage id='missionTitle' />
        </Title>
        <Paragraph>
          <FormattedMessage id='missionParagraph' />
        </Paragraph>
      </section>

      <section>
        <Title level={2}>
          <FormattedMessage id='howItWorksTitle' />
        </Title>
        <Paragraph>
          <FormattedMessage id='howItWorksParagraph' />
        </Paragraph>
      </section>

      <section>
        <Title level={2}>
          <FormattedMessage id='contactUsTitle' />
        </Title>
        <Paragraph>
          <FormattedMessage id='contactUsParagraph' />{' '}
          <Button
            type='link'
            icon={<GithubOutlined />}
            onClick={handleContactUsClick}
          >
            <FormattedMessage id='contactUsTitle' />
          </Button>
        </Paragraph>
      </section>
    </div>
  );
};

export default WithCustomLayout(HomePage);
