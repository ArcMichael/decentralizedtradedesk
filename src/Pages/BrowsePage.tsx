// src/Pages/BrowsePage.tsx

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Input, message, Avatar } from 'antd';
import { SettingOutlined, EditOutlined } from '@ant-design/icons';
import WithCustomLayout from '../Layout/WithCustomLayout';
import { getWeb3, getContract } from '../web3/web3Config';
import { defaultImage } from '../constants';
import { Product, Metadata, ContractProduct } from '../interfaces';

const { Search } = Input;
const { Meta } = Card;

const BrowsePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const initialize = async () => {
      const web3 = await getWeb3();
      if (!web3) {
        message.error(
          'Web3 is not initialized. Make sure MetaMask is installed and logged in.'
        );
        return;
      }

      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        message.error('No accounts found.');
        return;
      }

      await fetchProducts(web3);
    };

    initialize();
  }, []);

  const fetchProducts = async (web3: any) => {
    const contract = await getContract(web3);
    if (!contract) {
      message.error('Failed to load contract.');
      return;
    }

    const productIds: string[] = await contract.methods.getProductIds().call();

    const products: Product[] = [];
    for (const productId of productIds) {
      try {
        const product: ContractProduct = await contract.methods
          .products(productId)
          .call();
        let metadata: Metadata = { category: '', tags: [], imageUrl: '' };
        try {
          metadata = JSON.parse(product.metadata);
        } catch (error) {
          console.error(
            'Failed to parse metadata for product:',
            product.id,
            error
          );
        }

        products.push({
          id: product.id,
          name: product.name,
          description: product.description,
          price: parseFloat(web3.utils.fromWei(product.price, 'ether')),
          category: metadata.category,
          tags: metadata.tags,
          contractAddress: contract.options.address || '',
          transactionStatus: 'available', // Assuming default status
          creatorAddress: product.creator,
          timestamp: parseInt(product.createdAt, 10),
          transactionHash: '', // Placeholder, should be fetched or managed
          metadata: product.metadata,
          transactionConditions: product.details,
          currency: product.details.currency,
          imageUrl: metadata.imageUrl || defaultImage,
        });
      } catch (error) {
        console.error(`Failed to fetch product with id ${productId}:`, error);
      }
    }

    setProducts(products);
    setFilteredProducts(products);
  };

  const onSearch = (value: string) => {
    const filtered = products.filter(
      product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.description.toLowerCase().includes(value.toLowerCase()) ||
        product.tags.some(tag =>
          tag.toLowerCase().includes(value.toLowerCase())
        )
    );
    setFilteredProducts(filtered);
  };

  const handleAttackFirst = (id: string) => {
    // Implement the attack first functionality here
    console.log(`Attack First on product ${id}`);
  };

  const handleTrade = (id: string) => {
    // Implement the trade functionality here
    console.log(`Trade product ${id}`);
  };

  return (
    <div style={{ padding: '24px' }}>
      <header>
        <h1>Browse Items</h1>
        <Search
          placeholder='Search for items'
          enterButton='Search'
          size='large'
          onSearch={onSearch}
          style={{ marginBottom: '24px' }}
        />
      </header>

      <Row gutter={[16, 16]}>
        {filteredProducts.map(product => (
          <Col span={6} key={product.id}>
            <Card
              actions={[
                <SettingOutlined
                  key='attack'
                  onClick={() => handleAttackFirst(product.id)}
                />,
                <EditOutlined
                  key='trade'
                  onClick={() => handleTrade(product.id)}
                />,
              ]}
            >
              <Meta
                avatar={<Avatar src={product.imageUrl} />}
                title={product.name}
                description={
                  <div>
                    <p>{product.description}</p>
                    <p>
                      Price: {product.price} {product.currency}
                    </p>
                    <p>Tags: {product.tags.join(', ')}</p>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default WithCustomLayout(BrowsePage);
