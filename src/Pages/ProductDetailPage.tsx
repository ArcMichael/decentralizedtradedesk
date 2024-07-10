// src/Pages/ProductDetailPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge, Descriptions, message } from 'antd';
import WithCustomerLayout from '../Layout/WithCustomLayout';
import { getWeb3, getContract } from '../web3/web3Config';
import { Product, Metadata, ContractProduct } from '../interfaces';
import { defaultImage } from '../constants';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const web3 = await getWeb3();
      if (!web3) {
        message.error(
          'Web3 is not initialized. Make sure MetaMask is installed and logged in.'
        );
        return;
      }

      const contract = await getContract(web3);
      if (!contract) {
        message.error('Failed to load contract.');
        return;
      }

      try {
        const productData: ContractProduct = await contract.methods
          .products(id)
          .call();
        if (productData) {
          let metadata: Metadata = { category: '', tags: [], imageUrl: '' };
          try {
            metadata = JSON.parse(productData.metadata);
          } catch (error) {
            console.error(
              'Failed to parse metadata for product:',
              productData.id,
              error
            );
          }

          console.log(productData);

          setProduct({
            id: productData.id,
            name: productData.name,
            description: productData.description,
            price: parseFloat(web3.utils.fromWei(productData.price, 'ether')),
            category: metadata.category,
            tags: metadata.tags,
            contractAddress: contract.options.address || '',
            transactionStatus: 'available', // Assuming default status
            creatorAddress: productData.creator,
            timestamp: parseInt(productData.createdAt, 10),
            transactionHash: '', // Placeholder, should be fetched or managed
            metadata: productData.metadata,
            transactionConditions: productData.details,
            currency: productData.details.currency,
            imageUrl: metadata.imageUrl || defaultImage,
            copyrightUsageRules: productData.copyrightUsageRules || '',
          });
        } else {
          message.error('Product not found');
        }
      } catch (error) {
        message.error('Failed to fetch product data.');
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const items = [
    {
      key: '1',
      label: 'Name',
      children: product.name,
    },
    {
      key: '2',
      label: 'Description',
      children: product.description,
      span: 2,
    },
    {
      key: '3',
      label: 'Category',
      children: product.category,
    },
    {
      key: '4',
      label: 'Tags',
      children: product.tags.join(', '),
    },
    {
      key: '5',
      label: 'Image',
      children: (
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: '80px' }}
        />
      ),
    },
    {
      key: '6',
      label: 'Price',
      children: `${product.price} ${product.currency}`,
    },
    {
      key: '7',
      label: 'Status',
      children: <Badge status='processing' text={product.transactionStatus} />,
      span: 2,
    },
    {
      key: '8',
      label: 'Creator',
      children: product.creatorAddress,
      span: 3,
    },
    {
      key: '9',
      label: 'Current Owner',
      children: product.creatorAddress,
      span: 3,
    },
    {
      key: '10',
      label: 'copyrightUsageRules',
      children: product.copyrightUsageRules,
    },
  ];

  return <Descriptions title='Product Detail' bordered items={items} />;
};

export default WithCustomerLayout(ProductDetailPage);
