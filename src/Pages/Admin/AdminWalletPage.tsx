// src/Pages/Dashboard/UserWalletPage.tsx
import React, { useState, useEffect } from 'react';
import WithCustomLayout from '../../Layout/WithCustomLayout';
import { Typography, List, message } from 'antd';
import { getWeb3 } from '../../web3/web3Config';

const { Title } = Typography;

const UserWalletPage: React.FC = () => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [balances, setBalances] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchAccounts = async () => {
      const web3Instance = await getWeb3();
      if (!web3Instance) {
        message.error('Web3 is not initialized.');
        return;
      }

      try {
        const accounts = await web3Instance.eth.getAccounts();
        setAccounts(accounts);
        fetchBalances(web3Instance, accounts);
      } catch (error) {
        message.error('Failed to fetch accounts.');
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const fetchBalances = async (web3Instance: any, accounts: string[]) => {
    const balances: { [key: string]: string } = {};
    for (const account of accounts) {
      const balance = await web3Instance.eth.getBalance(account);
      balances[account] = web3Instance.utils.fromWei(balance, 'ether');
    }
    setBalances(balances);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>User Wallet Page</Title>
      <p>Manage your wallet and transactions from this page.</p>
      <List
        bordered
        dataSource={accounts}
        renderItem={(item, index) => (
          <List.Item style={index === 0 ? { backgroundColor: '#ffeb3b' } : {}}>
            <div>
              <div>Address: {item}</div>
              <div>Balance: {balances[item]} ETH</div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default WithCustomLayout(UserWalletPage);
