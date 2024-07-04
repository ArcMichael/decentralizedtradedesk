import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WithCustomLayout from '../../Layout/WithCustomLayout';
import { Typography, Table, Button, Modal, message } from 'antd';

const { Title } = Typography;
const { confirm } = Modal;

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

// 假设当前用户的地址信息
const currentUserAddress = '0x456';

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
  {
    id: '2',
    name: 'Product 2',
    description: 'Description of Product 2',
    price: 200,
    stock: 5,
    category: 'Category 2',
    tags: ['tag3', 'tag4'],
    contractAddress: '0x124',
    transactionStatus: 'available',
    creatorAddress: '0x123',
    timestamp: Date.now(),
    transactionHash: '0x790',
  },
  // Add more initial products if needed
];

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 过滤只显示当前用户创建的商品
    const userProducts = initialProducts.filter(
      product => product.creatorAddress === currentUserAddress
    );
    setProducts(userProducts);
  }, []);

  const handleAddProduct = () => {
    navigate('/admin/products/add');
  };

  const handleEditProduct = (id: string) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleDeleteProduct = (id: string) => {
    confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // 执行删除操作
        setProducts(products.filter(product => product.id !== id));
        message.success('Product deleted successfully');
      },
      onCancel() {
        message.info('Delete action cancelled');
      },
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => tags.join(', '),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Product) => (
        <div>
          <Button type='link' onClick={() => handleEditProduct(record.id)}>
            Edit
          </Button>
          <Button
            type='link'
            danger
            onClick={() => handleDeleteProduct(record.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>My Products</Title>
      <Button
        type='primary'
        onClick={handleAddProduct}
        style={{ marginBottom: '20px' }}
      >
        Add New Product
      </Button>
      <Table
        dataSource={products}
        columns={columns}
        rowKey='id'
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

export default WithCustomLayout(AdminProductsPage);
