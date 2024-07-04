// src/Pages/Admin/AdminEditProductPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Form, Input, Button, message } from 'antd';
import WithCustomLayout from '../../Layout/WithCustomLayout';

const { Title } = Typography;

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  tags: string[];
  contractAddress: string;
  transactionStatus: 'available' | 'sold' | 'inTransaction';
  creatorAddress: string;
  timestamp: number;
  transactionHash: string;
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Description of Product 1',
    price: 100,
    stock: 10,
    category: 'Category 1',
    tags: ['tag1', 'tag2'],
    contractAddress: '0x123',
    transactionStatus: 'available',
    creatorAddress: '0x456',
    timestamp: Date.now(),
    transactionHash: '0x789',
  },
  // Add more initial products if needed
];

const AdminEditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // TODO: 从后端获取商品信息
    const productToEdit = initialProducts.find(p => p.id === id);
    if (productToEdit) {
      setProduct(productToEdit);
    } else {
      message.error('Product not found');
      navigate('/admin/products');
    }
  }, [id, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (product) {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (product) {
      // TODO: 将更新后的商品信息发送到后端API
      // updateProduct(product);

      message.success('Product updated successfully');
      navigate('/admin/products');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Edit Product</Title>
      {product && (
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
            更新商品
          </Button>
        </Form>
      )}
    </div>
  );
};

export default WithCustomLayout(AdminEditProductPage);
