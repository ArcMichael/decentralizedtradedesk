// src/Pages/UserWalletPage.tsx

import React, { useState, useEffect } from 'react';
import WithCustomLayout from '../../Layout/WithCustomLayout';
import { Typography, List, message } from 'antd';
import { getWeb3 } from '../../web3/web3Config';
import { FormattedMessage } from 'react-intl';
import { useUser } from '../../contexts/UserContext';

const { Title } = Typography;

const UserWalletPage: React.FC = () => {
  const [balance, setBalance] = useState<string>('');
  const { user } = useUser(); // Use user from context

  useEffect(() => {
    const fetchUserBalance = async () => {
      if (!user || !user.address) {
        message.error('User is not authenticated.');
        return;
      }

      const web3Instance = await getWeb3();
      if (!web3Instance) {
        message.error('Web3 is not initialized.');
        return;
      }

      try {
        const balance = await web3Instance.eth.getBalance(user.address);
        setBalance(web3Instance.utils.fromWei(balance, 'ether'));
      } catch (error) {
        message.error('Failed to fetch balance.');
        console.error('Error fetching balance:', error);
      }
    };

    fetchUserBalance();
  }, [user]);

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>
        <FormattedMessage id='userWalletPage.title' />
      </Title>
      <p>
        <FormattedMessage id='userWalletPage.description' />
      </p>
      <List
        bordered
        dataSource={[user?.address]}
        renderItem={item => (
          <List.Item style={{ backgroundColor: '#ffeb3b' }}>
            <div>
              <div>
                <FormattedMessage id='address' />: {item}
              </div>
              <div>
                <FormattedMessage id='balance' />: {balance} ETH
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default WithCustomLayout(UserWalletPage);
