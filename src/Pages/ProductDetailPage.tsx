// src/Pages/ProductDetailPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge, Descriptions, Divider, message } from 'antd';
import WithCustomerLayout from '../Layout/WithCustomLayout';
import { getWeb3, getContract } from '../web3/web3Config';
import { Product, Metadata, ContractProduct } from '../interfaces';
import { defaultImage } from '../constants';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  // const [_purchaseHistory, setPurchaseHistory] = useState<any[]>([]);

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

          console.log('productData', productData);

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
            currentOwnerAddress: productData.currentOwnerAddress || '',
          });

          const events: any[] = await contract.getPastEvents('ALLEVENTS', {
            filter: { id: productData.id },
            fromBlock: 0,
            toBlock: 'latest',
          });

          console.log(events);

          // const history = events.map(event => {
          //   const eventData = web3.eth.abi.decodeParameters(
          //     ['string', 'uint256'],
          //     event.data
          //   );
          //   return {
          //     buyer: eventData[0],
          //     timestamp: new Date(parseInt(eventData[1]) * 1000).toLocaleString(),
          //   };
          // });

          // setPurchaseHistory([]);
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

  const ProductDetailItems = [
    {
      key: '1',
      label: 'ID',
      children: product.id,
      span: 1,
    },
    {
      key: '2',
      label: 'Currency',
      children: `${product.currency}`,
      span: 1,
    },
    {
      key: '3',
      label: 'Price',
      children: `${product.price}`,
      span: 1,
    },
    {
      key: '4',
      label: 'Name',
      children: product.name,
      span: 1,
    },
    {
      key: '5',
      label: 'Description',
      children: product.description,
      span: 1,
    },
    {
      key: '6',
      label: 'Image',
      children: (
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: '60px' }}
        />
      ),
      span: 1,
    },
    {
      key: '7',
      label: 'Category',
      children: product.category,
      span: 1,
    },
    {
      key: '8',
      label: 'Tags',
      children: product.tags.join(', '),
      span: 1,
    },
    {
      key: '9',
      label: 'Status',
      children: <Badge status='processing' text={product.transactionStatus} />,
      span: 1,
    },
    {
      key: '10',
      label: 'Creator',
      children: product.creatorAddress,
      span: 3,
    },
    {
      key: '11',
      label: 'Current Owner',
      children: product.creatorAddress,
      span: 3,
    },
    {
      key: '12',
      label: 'Copyright Usage Rules',
      children: product.copyrightUsageRules,
      span: 3,
    },
  ];

  return (
    <div>
      <Descriptions
        layout='vertical'
        title='Product Detail'
        size='small'
        bordered
        column={3}
      >
        {ProductDetailItems.map(item => (
          <Descriptions.Item key={item.key} label={item.label} span={item.span}>
            {item.children}
          </Descriptions.Item>
        ))}
      </Descriptions>
      <Divider />

      <Descriptions
        layout='vertical'
        title='Product Purchase History'
        size='small'
        bordered
      />
    </div>
  );
};

export default WithCustomerLayout(ProductDetailPage);
