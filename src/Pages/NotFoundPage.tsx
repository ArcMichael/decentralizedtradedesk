import React from 'react';
import { Button, Result } from 'antd';
import WithCustomerLayout from '../Layout/WithCustomLayout';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <Result
    status='404'
    title='404'
    subTitle='Sorry, the page you visited does not exist.'
    extra={
      <Link to={`/welcome`}>
        <Button type='primary'>Back Home</Button>
      </Link>
    }
  />
);

export default WithCustomerLayout(NotFoundPage);
