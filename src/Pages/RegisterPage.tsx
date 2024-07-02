// src/Pages/RegisterPage.tsx

import React from 'react';
import { Form, Input, Button } from 'antd';
import WithSimpleLayout from '../Layout/WithSimpleLayout';

const RegisterPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
    // Handle registration logic here
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '24px' }}>
      <h1>Register Page</h1>
      <Form
        name='register'
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

        <Form.Item
          name='confirm'
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder='Confirm Password' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WithSimpleLayout(RegisterPage);
