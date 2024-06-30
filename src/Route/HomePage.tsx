import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import WithCustomerLayout from '../Layout/WithCustomLayout'; // Adjust the import path as needed

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Button type='primary'>Ant Design Button</Button>
      <nav>
        <Link to='/welcome'>Go to Welcome Page</Link>
        <Link to='/'>Go to Home Page</Link>
      </nav>
    </div>
  );
};

export default WithCustomerLayout(HomePage);
