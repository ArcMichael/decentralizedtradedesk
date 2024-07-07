// src/utils/web3Utils.ts

import { getWeb3 } from '../web3/web3Config';

export const generateHashAndSignature = async (publicKey: string) => {
  const web3 = await getWeb3();
  if (!web3) {
    throw new Error('Web3 is not initialized.');
  }
  const hash = web3.utils.sha3(publicKey) || '';
  const signature = await web3.eth.personal.sign(hash, publicKey, '');
  return { hash, signature };
};
