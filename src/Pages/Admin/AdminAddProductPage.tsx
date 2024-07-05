// src/Pages/Admin/AdminAddProductPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Form, Input, Button, message } from 'antd';
import WithCustomLayout from '../../Layout/WithCustomLayout';
import { getWeb3, getContract } from '../../web3/web3Config';

const { Title } = Typography;

const AdminAddProductPage: React.FC = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    tags: [] as string[],
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  interface ProductData {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    tags: string[];
  }

  const saveProduct = async (productData: ProductData) => {
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

    const contract = await getContract(web3);
    if (!contract) {
      message.error('Failed to load contract.');
      return;
    }

    try {
      await contract.methods
        .addProduct(
          productData.name,
          productData.description,
          web3.utils.toWei(productData.price.toString(), 'ether'),
          productData.stock,
          productData.category,
          productData.tags
        )
        .send({
          from: accounts[0],
          gas: '500000', // 增加的gas limit数值
        });

      message.success('Product added successfully');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error adding product:', error);
      message.error('Failed to add product.');
    }
  };

  const handleSubmit = () => {
    saveProduct(product);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Add Product</Title>
      <Form layout='vertical' onFinish={handleSubmit}>
        <Form.Item label='商品名称' required>
          <Input
            name='name'
            value={product.name}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label='商品描述' required>
          <Input
            name='description'
            value={product.description}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label='价格' required>
          <Input
            type='number'
            name='price'
            value={product.price}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label='库存数量' required>
          <Input
            type='number'
            name='stock'
            value={product.stock}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label='分类' required>
          <Input
            name='category'
            value={product.category}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label='标签' required>
          <Input
            name='tags'
            value={product.tags.join(',')}
            onChange={e =>
              setProduct({ ...product, tags: e.target.value.split(',') })
            }
          />
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          上架商品
        </Button>
      </Form>
    </div>
  );
};

export default WithCustomLayout(AdminAddProductPage);
