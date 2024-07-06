import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WithCustomLayout from '../../Layout/WithCustomLayout';
import { Typography, Table, Button, Modal, message } from 'antd';
import { getWeb3, getContract } from '../../web3/web3Config';

const { Title } = Typography;
const { confirm } = Modal;

interface Product {
  id: number;
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

interface ContractProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  tags?: string[]; // Make tags optional
  creator?: string; // Make creator optional
  createdAt: string;
}

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

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

      await fetchProducts(accounts[0], web3);
    };

    initialize();
  }, []);

  const fetchProducts = async (currentUserAddress: string, web3: any) => {
    const contract = await getContract(web3);
    if (!contract) {
      message.error('Failed to load contract.');
      return;
    }

    const productCount = parseInt(
      await contract.methods.productCount().call(),
      10
    );
    if (isNaN(productCount)) {
      message.error('Failed to fetch product count.');
      return;
    }

    const products: Product[] = [];
    for (let i = 1; i <= productCount; i++) {
      const product: ContractProduct = await contract.methods
        .products(i)
        .call();
      if (product && product.creator) {
        products.push({
          id: parseInt(product.id, 10),
          name: product.name,
          description: product.description,
          price: parseFloat(web3.utils.fromWei(product.price, 'ether')),
          stock: parseInt(product.stock, 10),
          category: product.category,
          tags: product.tags || [], // Ensure tags is an array
          contractAddress: contract.options.address || '',
          transactionStatus: 'available', // Assuming default status
          creatorAddress: product.creator, // Assuming the contract has creator field
          timestamp: parseInt(product.createdAt, 10),
          transactionHash: '', // Placeholder, should be fetched or managed
        });
      }
    }

    // Filter products by current user address
    const userProducts = products.filter(
      product =>
        product.creatorAddress?.toLowerCase() ===
        currentUserAddress.toLowerCase()
    );
    setProducts(userProducts);
  };

  const handleAddProduct = () => {
    navigate('/admin/products/add');
  };

  const handleEditProduct = (id: number) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleDeleteProduct = (id: number) => {
    confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // Perform delete operation
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
