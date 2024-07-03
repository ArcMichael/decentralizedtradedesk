// src/Pages/LoginPage.tsx

import React, { useState, useCallback } from 'react';
import { Button, message, Spin } from 'antd';
import WithSimpleLayout from '../Layout/WithSimpleLayout';
import { getWeb3 } from '../web3/web3Config';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const initMetaMask = useCallback(async () => {
    setLoading(true);
    try {
      const web3Instance = await getWeb3();
      if (web3Instance) {
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          login(accounts[0]);
          message.success('MetaMask connected. You are now logged in.');
          setIsLoggedIn(true);
        } else {
          message.error(
            'MetaMask is not connected. Please log in to MetaMask.'
          );
        }
      }
    } catch (error) {
      message.error('Failed to load web3 or accounts.');
    } finally {
      setLoading(false);
    }
  }, [login]);

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '24px' }}>
      <h1>Login Page</h1>
      <Spin spinning={loading} tip='Connecting to MetaMask...'>
        {isLoggedIn ? (
          <Button
            style={{
              backgroundColor: '#1890ff',
              color: 'white',
              margin: '16px 0',
            }}
            block
            onClick={() => navigate('/')}
          >
            Go
          </Button>
        ) : (
          <Button style={{ margin: '16px 0' }} block onClick={initMetaMask}>
            Connect to MetaMask
          </Button>
        )}
        <Button
          onClick={() =>
            window.open('https://metamask.io/download.html', '_blank')
          }
          style={{ margin: '16px 0', borderStyle: 'dashed' }}
          block
        >
          Install MetaMask
        </Button>
      </Spin>
    </div>
  );
};

export default WithSimpleLayout(LoginPage);
