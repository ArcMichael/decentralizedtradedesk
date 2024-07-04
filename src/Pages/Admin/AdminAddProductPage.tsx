// src/Pages/Admin/AdminAddProductPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Form, Input, Button, message } from 'antd';
import WithCustomLayout from '../../Layout/WithCustomLayout';

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

  const handleSubmit = () => {
    // TODO: 将商品信息发送到后端API
    // saveProduct(product);

    message.success('Product added successfully');
    navigate('/admin/products');
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
