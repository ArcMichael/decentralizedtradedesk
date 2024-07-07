// src/interfaces.ts

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
  stock: number;
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
