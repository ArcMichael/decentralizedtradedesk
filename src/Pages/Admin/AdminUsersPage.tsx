import React, { useState, useEffect } from 'react';
import WithCustomLayout from '../../Layout/WithCustomLayout';
import { Typography, List, message } from 'antd';
import { getWeb3 } from '../../web3/web3Config';
import { FormattedMessage } from 'react-intl';

const { Title } = Typography;

interface AccountInfo {
  address: string;
  balance: string;
}

const AdminUsersPage: React.FC = () => {
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      const web3 = await getWeb3();
      if (!web3) {
        message.error('Web3 is not initialized.');
        return;
      }

      try {
        const accountsList = await web3.eth.getAccounts();
        if (accountsList.length > 0) {
          setSelectedAccount(accountsList[0]); // Set the first account as the current user
          const balance = await web3.eth.getBalance(accountsList[0]);
          setAccount({
            address: accountsList[0],
            balance: web3.utils.fromWei(balance, 'ether') + ' ETH',
          });
        }
      } catch (error) {
        message.error('Failed to fetch accounts.');
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

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
            <List.Item
              style={{
                backgroundColor:
                  selectedAccount === item.address ? '#ffeb3b' : 'transparent',
              }}
            >
              {item.address} - <FormattedMessage id='balance' />: {item.balance}
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default WithCustomLayout(AdminUsersPage);
