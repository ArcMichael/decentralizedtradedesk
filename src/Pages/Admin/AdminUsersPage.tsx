// src/Pages/AdminUsersPage.tsx

import React, { useState, useEffect } from 'react';
import WithCustomLayout from '../../Layout/WithCustomLayout';
import { Typography, List, message } from 'antd';
import { getWeb3 } from '../../web3/web3Config';
import { FormattedMessage } from 'react-intl';
import { useUser } from '../../contexts/UserContext';

const { Title } = Typography;

interface AccountInfo {
  address: string;
  balance: string;
}

const AdminUsersPage: React.FC = () => {
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const { user } = useUser(); // Use user from context

  useEffect(() => {
    const fetchUserAccount = async () => {
      if (!user || !user.address) {
        message.error('User is not authenticated.');
        return;
      }

      const web3 = await getWeb3();
      if (!web3) {
        message.error('Web3 is not initialized.');
        return;
      }

      try {
        const balance = await web3.eth.getBalance(user.address);
        setAccount({
          address: user.address,
          balance: web3.utils.fromWei(balance, 'ether') + ' ETH',
        });
      } catch (error) {
        message.error('Failed to fetch account balance.');
        console.error('Error fetching account balance:', error);
      }
    };

    fetchUserAccount();
  }, [user]);

  return (
    <div style={{ padding: '24px' }}>
      <Title level={3}>
        <FormattedMessage id='adminUsersPage.title' />
      </Title>
      <p>
        <FormattedMessage id='adminUsersPage.description' />
      </p>
      {account && (
        <List
          bordered
          dataSource={[account]}
          renderItem={item => (
            <List.Item style={{ backgroundColor: '#ffeb3b' }}>
              {item.address} - <FormattedMessage id='balance' />: {item.balance}
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default WithCustomLayout(AdminUsersPage);
