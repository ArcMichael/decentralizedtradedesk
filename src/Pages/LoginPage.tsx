// src/Pages/LoginPage.tsx
import React, { useState, useCallback } from 'react';
import { Button, Input, message, Spin, Divider } from 'antd';
import WithSimpleLayout from '../Layout/WithSimpleLayout';
import { getWeb3 } from '../web3/web3Config';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { openExternalLink } from '../utils/utils'; // Import the utility function

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, login } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [privateKey, setPrivateKey] = useState<string>('');
  const [showPrivateKeyLogin, setShowPrivateKeyLogin] =
    useState<boolean>(false);

  const initMetaMask = useCallback(async () => {
    setLoading(true);
    try {
      const web3Instance = await getWeb3();
      if (web3Instance) {
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          login(accounts[0]);
          message.success('MetaMask connected. You are now logged in.');
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

  const handlePrivateKeyLogin = useCallback(async () => {
    setLoading(true);
    try {
      const web3Instance = new Web3(
        new Web3.providers.HttpProvider('http://127.0.0.1:7545')
      ); // Ganache default URL
      const account = web3Instance.eth.accounts.privateKeyToAccount(privateKey);
      login(account.address);
      message.success(
        'Logged in with private key via Ganache. You are now logged in.'
      );
    } catch (error) {
      message.error('Failed to login with private key via Ganache.');
    } finally {
      setLoading(false);
    }
  }, [privateKey, login]);

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '24px' }}>
      <h1>Login Page</h1>
      <Spin spinning={loading} tip='Connecting to MetaMask...'>
        {user ? (
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
          <>
            <Button
              onClick={() => setShowPrivateKeyLogin(!showPrivateKeyLogin)}
              style={{ margin: '16px 0', display: 'block' }}
              block
            >
              Toggle Private Key Login
            </Button>
            {showPrivateKeyLogin && (
              <div
                style={{
                  border: '1px solid #d9d9d9',
                  padding: '16px',
                  borderRadius: '4px',
                  marginBottom: '16px',
                }}
              >
                <Input.Password
                  placeholder='Enter your private key'
                  value={privateKey}
                  onChange={e => setPrivateKey(e.target.value)}
                  style={{ margin: '16px 0' }}
                />
                <Button
                  style={{ margin: '16px 0' }}
                  block
                  onClick={handlePrivateKeyLogin}
                >
                  Private Key Login via Ganache
                </Button>
              </div>
            )}
            <Divider />
            <div
              style={{
                border: '1px solid #d9d9d9',
                padding: '16px',
                borderRadius: '4px',
              }}
            >
              <Button style={{ margin: '16px 0' }} block onClick={initMetaMask}>
                Connect to MetaMask
              </Button>
              <Button
                onClick={() =>
                  openExternalLink('https://metamask.io/download.html')
                }
                style={{ margin: '16px 0', borderStyle: 'dashed' }}
                block
              >
                Install MetaMask
              </Button>
            </div>
          </>
        )}
      </Spin>
    </div>
  );
};

export default WithSimpleLayout(LoginPage);
