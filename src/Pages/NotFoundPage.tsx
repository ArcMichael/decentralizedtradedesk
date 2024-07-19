import React from 'react';
import { Button, Result } from 'antd';
import WithCustomerLayout from '../Layout/WithCustomLayout';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const NotFoundPage: React.FC = () => (
  <Result
    status='404'
    title={<FormattedMessage id='notFoundPage.title' />}
    subTitle={<FormattedMessage id='notFoundPage.subTitle' />}
    extra={
      <Link to={`/`}>
        <Button type='primary'>
          <FormattedMessage id='notFoundPage.backHome' />
        </Button>
      </Link>
    }
  />
);

export default WithCustomerLayout(NotFoundPage);
