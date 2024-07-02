// src/Pages/BrowsePage.tsx

import React from 'react';
import { Row, Col, Card, Input } from 'antd';
import WithCustomLayout from '../Layout/WithCustomLayout'; // Adjust the import path as needed

const { Search } = Input;

const BrowsePage: React.FC = () => {
  const onSearch = (value: string) => {
    // Implement search functionality here
    console.log(value);
  };

  return (
    <div style={{ padding: '24px' }}>
      <header>
        <h1>Browse Items</h1>
        <Search
          placeholder='Search for items'
          enterButton='Search'
          size='large'
          onSearch={onSearch}
          style={{ marginBottom: '24px' }}
        />
      </header>

      <Row gutter={[16, 16]}>
        {/* Example items, replace with dynamic content */}
        <Col span={8}>
          <Card title='Item 1' bordered={false}>
            Item 1 description
          </Card>
        </Col>
        <Col span={8}>
          <Card title='Item 2' bordered={false}>
            Item 2 description
          </Card>
        </Col>
        <Col span={8}>
          <Card title='Item 3' bordered={false}>
            Item 3 description
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default WithCustomLayout(BrowsePage);
