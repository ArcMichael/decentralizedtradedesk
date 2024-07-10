// src/constants/interfaces.ts

export interface Metadata {
  category: string;
  tags: string[];
  imageUrl: string;
}

export interface TransactionConditions {
  fixedPricePayment: boolean;
}

export interface ProductData {
  productId: string;
  name: string;
  description: string;
  price: number;
  metadata: Metadata;
  currentOwner: string;
  creator: string;
  transactionConditions: TransactionConditions;
  copyrightUsageRules: string;
  currency: string;
  hash: string;
  digitalSignature: string;
  createdAt: string;
  authorizationRecord: string | null;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  contractAddress: string;
  transactionStatus: 'available' | 'sold' | 'inTransaction';
  creatorAddress: string;
  timestamp: number;
  transactionHash: string;
  metadata: string;
  transactionConditions: TransactionConditions;
  currency: string;
  imageUrl: string;
}

export interface ContractProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  metadata: string;
  createdAt: string;
  currentOwner: string;
  details: {
    fixedPricePayment: boolean;
    currency: string;
    hash: string;
    digitalSignature: string;
  };
  creator: string;
}
