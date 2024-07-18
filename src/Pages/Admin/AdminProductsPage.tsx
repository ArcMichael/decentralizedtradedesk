// src/Pages/Admin/AdminProductsPage.tsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WithCustomLayout from '../../Layout/WithCustomLayout';
import { Typography, Table, Button, Modal, message, Tooltip } from 'antd';
import { getWeb3, getContract } from '../../web3/web3Config';
import { defaultImage } from '../../constants';
import { ContractProduct, Metadata, Product } from '../../interfaces';
import { FormattedMessage } from 'react-intl';

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
          <FormattedMessage id='adminProductsPage.web3NotInitialized' />
        );
        return;
      }

      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        message.error(<FormattedMessage id='adminProductsPage.noAccounts' />);
        return;
      }

      await fetchProducts(accounts[0], web3);
    };

    initialize();
  }, []);

  const fetchProducts = async (currentUserAddress: string, web3: any) => {
    const contract = await getContract(web3);
    if (!contract) {
      message.error(
        <FormattedMessage id='adminProductsPage.failedToLoadContract' />
      );
      return;
    }

    const productCount = parseInt(
      await contract.methods.productCount().call(),
      10
    );

    if (isNaN(productCount)) {
      message.error(
        <FormattedMessage id='adminProductsPage.failedToFetchProductCount' />
      );
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
            tags: metadata.tags || [],
            contractAddress: contract.options.address || '',
            transactionStatus: 'available',
            creatorAddress: product.creator,
            timestamp: parseInt(product.createdAt, 10),
            transactionHash: '',
            metadata: product.metadata,
            transactionConditions: product.details,
            currency: product.details.currency,
            imageUrl: metadata.imageUrl || defaultImage,
            copyrightUsageRules: product.copyrightUsageRules,
            currentOwnerAddress: product.currentOwner,
          });

          console.log('products', products);
        }
      } catch (error) {
        console.error(`Failed to fetch product with id ${productId}:`, error);
      }
    }

    const userProducts = products.filter(
      product =>
        product.currentOwnerAddress?.toLowerCase() ===
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
      title: <FormattedMessage id='adminProductsPage.confirmDeleteTitle' />,
      content: <FormattedMessage id='adminProductsPage.confirmDeleteContent' />,
      okText: <FormattedMessage id='adminProductsPage.confirmDeleteOkText' />,
      okType: 'danger',
      cancelText: (
        <FormattedMessage id='adminProductsPage.confirmDeleteCancelText' />
      ),
      onOk: async () => {
        try {
          const web3 = await getWeb3();
          if (!web3) {
            message.error(
              <FormattedMessage id='adminProductsPage.web3NotInitialized' />
            );
            return;
          }

          const contract = await getContract(web3);
          if (!contract) {
            message.error(
              <FormattedMessage id='adminProductsPage.failedToLoadContract' />
            );
            return;
          }

          const accounts = await web3.eth.getAccounts();
          if (accounts.length === 0) {
            message.error(
              <FormattedMessage id='adminProductsPage.noAccounts' />
            );
            return;
          }

          const tx = contract.methods.deleteProduct(id);

          const gas = await tx.estimateGas({ from: accounts[0] });

          await tx.send({
            from: accounts[0],
            gas: gas.toString(),
          });

          setProducts(products.filter(product => product.id !== id));
          message.success(
            <FormattedMessage id='adminProductsPage.deleteSuccess' />
          );
        } catch (error: unknown) {
          const errMsg = (error as Error).message;
          console.error('Error deleting product:', errMsg);
          message.error(
            <FormattedMessage id='adminProductsPage.deleteFailed' />
          );
        }
      },
      onCancel() {
        message.info(
          <FormattedMessage id='adminProductsPage.deleteCancelled' />
        );
      },
    });
  };

  const deleteProductButtom = (record: Product) => {
    const isDisabled = record.creatorAddress !== record.currentOwnerAddress;

    return (
      <Tooltip
        placement='left'
        title={
          isDisabled ? (
            <FormattedMessage id='adminProductsPage.deleteTooltip' />
          ) : (
            ''
          )
        }
      >
        <Button
          type='link'
          danger
          onClick={() => handleDeleteProduct(record.id)}
          disabled={isDisabled}
        >
          <FormattedMessage id='adminProductsPage.deleteButton' />
        </Button>
      </Tooltip>
    );
  };

  const columns = [
    {
      title: <FormattedMessage id='adminProductsPage.name' />,
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Product) => (
        <Link to={`/product/${record.id}`}>{name}</Link>
      ),
    },
    {
      title: <FormattedMessage id='adminProductsPage.image' />,
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl: string) => (
        <img
          src={imageUrl}
          alt='Product'
          style={{ width: '50px', height: '50px' }}
          onError={(e: any) => {
            e.target.src = defaultImage;
          }}
        />
      ),
    },
    {
      title: <FormattedMessage id='adminProductsPage.price' />,
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price}`,
    },
    {
      title: <FormattedMessage id='adminProductsPage.currency' />,
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: <FormattedMessage id='adminProductsPage.category' />,
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: <FormattedMessage id='adminProductsPage.tags' />,
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => tags.join(', '),
    },
    {
      title: <FormattedMessage id='adminProductsPage.actions' />,
      key: 'action',
      render: (_: any, record: Product) => (
        <div>
          <Button type='link' onClick={() => handleEditProduct(record.id)}>
            <FormattedMessage id='adminProductsPage.editButton' />
          </Button>
          {deleteProductButtom(record)}
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>
        <FormattedMessage id='adminProductsPage.title' />
      </Title>
      <Button
        type='primary'
        onClick={handleAddProduct}
        style={{ marginBottom: '20px' }}
      >
        <FormattedMessage id='adminProductsPage.addButton' />
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
