// src/Pages/LoginPage.tsx
import React, { useState, useCallback } from 'react';
import { Button, Input, message, Spin, Divider } from 'antd';
import WithSimpleLayout from '../Layout/WithSimpleLayout';
import { getWeb3 } from '../web3/web3Config';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { openExternalLink } from '../utils/utils'; // Import the utility function
import { FormattedMessage, useIntl } from 'react-intl';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, login } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [privateKey, setPrivateKey] = useState<string>('');
  const [showPrivateKeyLogin, setShowPrivateKeyLogin] =
    useState<boolean>(false);
  const intl = useIntl();

  const initMetaMask = useCallback(async () => {
    setLoading(true);
    try {
      const web3Instance = await getWeb3();
      if (web3Instance) {
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          login(accounts[0]);
          message.success(intl.formatMessage({ id: 'metaMaskConnected' }));
        } else {
          message.error(intl.formatMessage({ id: 'metaMaskNotConnected' }));
        }
      }
    } catch (error) {
      message.error(intl.formatMessage({ id: 'failedToLoadWeb3' }));
    } finally {
      setLoading(false);
    }
  }, [login, intl]);

  const handlePrivateKeyLogin = useCallback(async () => {
    setLoading(true);
    try {
      const web3Instance = new Web3(
        new Web3.providers.HttpProvider('http://127.0.0.1:7545')
      ); // Ganache default URL
      const account = web3Instance.eth.accounts.privateKeyToAccount(privateKey);
      login(account.address);
      message.success(intl.formatMessage({ id: 'loggedInWithPrivateKey' }));
    } catch (error) {
      message.error(intl.formatMessage({ id: 'failedToLoginWithPrivateKey' }));
    } finally {
      setLoading(false);
    }
  }, [privateKey, login, intl]);

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '24px' }}>
      <h1>
        <FormattedMessage id='loginPageTitle' />
      </h1>
      <Spin
        spinning={loading}
        tip={intl.formatMessage({ id: 'connectingToMetaMask' })}
      >
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
            <FormattedMessage id='goButton' />
          </Button>
        ) : (
          <>
            <Button
              onClick={() => setShowPrivateKeyLogin(!showPrivateKeyLogin)}
              style={{ margin: '16px 0', display: 'block' }}
              block
            >
              <FormattedMessage id='togglePrivateKeyLogin' />
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
                  placeholder={intl.formatMessage({ id: 'enterPrivateKey' })}
                  value={privateKey}
                  onChange={e => setPrivateKey(e.target.value)}
                  style={{ margin: '16px 0' }}
                />
                <Button
                  style={{ margin: '16px 0' }}
                  block
                  onClick={handlePrivateKeyLogin}
                >
                  <FormattedMessage id='privateKeyLogin' />
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
                <FormattedMessage id='connectMetaMask' />
              </Button>
              <Button
                onClick={() =>
                  openExternalLink('https://metamask.io/download.html')
                }
                style={{ margin: '16px 0', borderStyle: 'dashed' }}
                block
              >
                <FormattedMessage id='installMetaMask' />
              </Button>
            </div>
          </>
        )}
      </Spin>
    </div>
  );
};

export default WithSimpleLayout(LoginPage);
