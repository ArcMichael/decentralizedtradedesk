// src/Pages/Admin/AdminProductsPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WithCustomLayout from '../../Layout/WithCustomLayout';
import { Typography, Table, Button, Modal, message } from 'antd';
import { getWeb3, getContract } from '../../web3/web3Config';
import { defaultImage } from '../../constants'; // Import default image from constants
import { ContractProduct, Metadata, Product } from '../../interfaces';

const { Title } = Typography;
const { confirm } = Modal;

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
    const productIds: string[] = await contract.methods.getProductIds().call();

    for (const productId of productIds) {
      try {
        const product: ContractProduct = await contract.methods
          .products(productId)
          .call();

        if (product && product.creator) {
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
            tags: metadata.tags || [], // Ensure tags is an array
            contractAddress: contract.options.address || '',
            transactionStatus: 'available', // Assuming default status
            creatorAddress: product.creator, // Assuming the contract has creator field
            timestamp: parseInt(product.createdAt, 10),
            transactionHash: '', // Placeholder, should be fetched or managed
            metadata: product.metadata,
            transactionConditions: product.details,
            currency: product.details.currency,
            imageUrl: metadata.imageUrl || defaultImage, // Use default image if imageUrl is empty
          });
        }
      } catch (error) {
        console.error(`Failed to fetch product with id ${productId}:`, error);
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

  const handleEditProduct = (id: string) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleDeleteProduct = async (id: string) => {
    confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
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

          const accounts = await web3.eth.getAccounts();
          if (accounts.length === 0) {
            message.error('No accounts found.');
            return;
          }

          const tx = contract.methods.deleteProduct(id);

          const gas = await tx.estimateGas({ from: accounts[0] });

          await tx.send({
            from: accounts[0],
            gas: gas.toString(),
          });

          setProducts(products.filter(product => product.id !== id));
          message.success('Product deleted successfully');
        } catch (error: unknown) {
          const errMsg = (error as Error).message;
          console.error('Error deleting product:', errMsg);
          message.error('Failed to delete product.');
        }
      },
      onCancel() {
        message.info('Delete action cancelled');
      },
    });
  };

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '图片',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl: string) => (
        <img
          src={imageUrl}
          alt='Product'
          style={{ width: '50px', height: '50px' }}
          onError={(e: any) => {
            e.target.src = defaultImage; // Use default image if the original one fails to load
          }}
        />
      ),
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price}`,
    },
    {
      title: '货币类型',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => tags.join(', '),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Product) => (
        <div>
          <Button type='link' onClick={() => handleEditProduct(record.id)}>
            编辑
          </Button>
          <Button
            type='link'
            danger
            onClick={() => handleDeleteProduct(record.id)}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>我的商品</Title>
      <Button
        type='primary'
        onClick={handleAddProduct}
        style={{ marginBottom: '20px' }}
      >
        添加新商品
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
