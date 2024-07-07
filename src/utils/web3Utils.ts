// src/utils/web3Utils.ts

import { getWeb3 } from '../web3/web3Config';

export const generateHashAndSignature = async (publicKey: string) => {
  const web3 = await getWeb3();
  if (!web3) {
    throw new Error('Web3 is not initialized.');
  }

  const hash = web3.utils.sha3(publicKey) || '';

  try {
    // Try using personal_sign first
    const signature = await web3.eth.personal.sign(hash, publicKey, '');
    return { hash, signature };
  } catch (error) {
    console.warn('personal_sign method failed, trying eth_sign:', error);

    // Fallback to eth_sign if personal_sign fails
    try {
      const signature = await web3.eth.sign(hash, publicKey);
      return { hash, signature };
    } catch (ethSignError) {
      console.error('eth_sign method also failed:', ethSignError);
      throw new Error('Both personal_sign and eth_sign methods failed.');
    }
  }
};
