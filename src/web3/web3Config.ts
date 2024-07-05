// src/web3/web3Config.ts

import Web3 from 'web3';
import ProductManagement from '../build/contracts/ProductManagement.json';

// Declare a TypeScript interface to describe the structure expected in `ProductManagement.networks`
interface NetworkConfigurations {
  [key: string]: {
    // Index signature
    events: Record<string, any>;
    links: Record<string, any>;
    address: string;
    transactionHash: string;
  };
}

// Casting `ProductManagement.networks` to the correct type
const networks = ProductManagement.networks as NetworkConfigurations;

declare global {
  interface Window {
    ethereum: any;
  }
}

const getWeb3 = async (): Promise<Web3 | null> => {
  try {
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      throw new Error(
        'No accounts found. Check if Ganache is running properly.'
      );
    }
    console.log('Connected to Ganache. Accounts:', accounts);
    return web3;
  } catch (error) {
    console.error('Failed to load web3. Error:', error);
    return null;
  }
};

const getContract = async (web3: Web3) => {
  try {
    const networkId = await web3.eth.net.getId();
    const networkIdStr = networkId.toString();
    const deployedNetwork = networks[networkIdStr];

    if (!deployedNetwork) {
      throw new Error(
        `No deployment of contract found on network ID ${networkIdStr}`
      );
    }

    const contract = new web3.eth.Contract(
      ProductManagement.abi,
      deployedNetwork.address
    );

    console.log('Contract loaded successfully.');
    return contract;
  } catch (error) {
    console.error('Error getting contract:', error);
    return null;
  }
};

export { getWeb3, getContract };
