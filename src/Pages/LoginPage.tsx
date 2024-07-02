// src/Pages/LoginPage.tsx

import React from 'react';
import { Form, Input, Button } from 'antd';
import WithSimpleLayout from '../Layout/WithSimpleLayout';

const LoginPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
    // Handle login logic here
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '24px' }}>
      <h1>Login Page</h1>
      <Form
        name='login'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder='Username' />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder='Password' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WithSimpleLayout(LoginPage);
