// src/web3/web3Config.ts

import Web3 from 'web3';
import UserLogin from '../build/contracts/UserLogin.json';

declare global {
  interface Window {
    ethereum: any;
  }
}

const getWeb3 = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const web3Instance = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      return web3Instance;
    } catch (error) {
      console.error('Error connecting to web3:', error);
      return null;
    }
  } else {
    console.log('MetaMask is not installed.');
    return null;
  }
};

const getContract = async (web3: Web3) => {
  try {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = (UserLogin.networks as any)[Number(networkId)];
    const contractInstance = new web3.eth.Contract(
      UserLogin.abi,
      deployedNetwork && deployedNetwork.address
    );
    return contractInstance;
  } catch (error) {
    console.error('Error getting contract:', error);
    return null;
  }
};

export { getWeb3, getContract };
