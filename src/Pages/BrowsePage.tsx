// src/Pages/BrowsePage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Input, message, Avatar, Popover, Divider } from 'antd';
import {
  InfoCircleOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import WithCustomLayout from '../Layout/WithCustomLayout';
import { getWeb3, getContract } from '../web3/web3Config';
import { defaultImage } from '../constants';
import { Product, Metadata, ContractProduct } from '../interfaces';
import { shortenAddress } from '../utils/utils';
import { FormattedMessage, useIntl } from 'react-intl';

const { Search } = Input;
const { Meta } = Card;

const BrowsePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentAccount, setCurrentAccount] = useState<string | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const intl = useIntl();

  useEffect(() => {
    const initialize = async () => {
      const web3 = await getWeb3();
      if (!web3) {
        message.error(
          intl.formatMessage({ id: 'browsePage.web3NotInitialized' })
        );
        return;
      }

      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        message.error(intl.formatMessage({ id: 'browsePage.noAccounts' }));
        return;
      }

      setCurrentAccount(accounts[0]);
      await fetchProducts(web3);
    };

    initialize();
  }, []);

  const fetchProducts = async (web3: any) => {
    const contract = await getContract(web3);
    if (!contract) {
      message.error(
        intl.formatMessage({ id: 'browsePage.failedToLoadContract' })
      );
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
          currentOwnerAddress: product.currentOwner,
          timestamp: parseInt(product.createdAt, 10),
          transactionHash: '', // Placeholder, should be fetched or managed
          metadata: product.metadata,
          transactionConditions: product.details,
          currency: product.details.currency,
          imageUrl: metadata.imageUrl || defaultImage,
          copyrightUsageRules: product.copyrightUsageRules,
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

  const handleInfo = (id: string) => {
    navigate(`/product/${id}`);
  };

  const handleSetting = (id: string) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handlePurchase = async (product: Product) => {
    const web3 = await getWeb3();
    if (!web3) {
      message.error(
        intl.formatMessage({ id: 'browsePage.web3NotInitialized' })
      );
      return;
    }

    const contract = await getContract(web3);
    if (!contract) {
      message.error(
        intl.formatMessage({ id: 'browsePage.failedToLoadContract' })
      );
      return;
    }

    try {
      await contract.methods
        .purchaseProduct(product.id)
        .send({
          from: currentAccount,
          value: web3.utils.toWei(product.price.toString(), 'ether'),
        })
        .then(result => {
          console.log(result);
          navigate(0);
        });
      message.success(intl.formatMessage({ id: 'browsePage.purchaseSuccess' }));
    } catch (error) {
      console.error('Purchase failed:', error);
      message.error(intl.formatMessage({ id: 'browsePage.purchaseFailed' }));
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <header>
        <h1>
          <FormattedMessage id='browsePage.title' />
        </h1>
        <Search
          placeholder={intl.formatMessage({
            id: 'browsePage.searchPlaceholder',
          })}
          enterButton={intl.formatMessage({ id: 'browsePage.searchButton' })}
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
                <Popover
                  placement='top'
                  title={<FormattedMessage id='browsePage.info' />}
                  content={<FormattedMessage id='browsePage.infoContent' />}
                >
                  <InfoCircleOutlined
                    key='info'
                    onClick={() => handleInfo(product.id)}
                  />
                </Popover>,
                currentAccount === product.currentOwnerAddress && (
                  <Popover
                    placement='top'
                    title={<FormattedMessage id='browsePage.settings' />}
                    content={
                      <FormattedMessage id='browsePage.settingsContent' />
                    }
                  >
                    <SettingOutlined
                      key='setting'
                      onClick={() => handleSetting(product.id)}
                    />
                  </Popover>
                ),
                currentAccount !== product.currentOwnerAddress && (
                  <Popover
                    placement='top'
                    title={<FormattedMessage id='browsePage.purchase' />}
                    content={
                      <FormattedMessage id='browsePage.purchaseContent' />
                    }
                  >
                    <ShoppingCartOutlined
                      key='purchase'
                      onClick={() => handlePurchase(product)}
                    />
                  </Popover>
                ),
              ].filter(Boolean)} // Filter out null values
            >
              <Meta
                avatar={<Avatar src={product.imageUrl} />}
                title={product.name}
                description={
                  <div>
                    <p
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <FormattedMessage id='browsePage.description' />:{' '}
                      {product.description}
                    </p>
                    <p>
                      <FormattedMessage id='browsePage.price' />:{' '}
                      {product.price} {product.currency}
                    </p>
                    <p>
                      <FormattedMessage id='browsePage.creator' />:{' '}
                      {shortenAddress(product.creatorAddress)}
                    </p>
                    <p>
                      <FormattedMessage id='browsePage.currentOwner' />:{' '}
                      {shortenAddress(product.currentOwnerAddress)}
                    </p>
                    <Divider
                      orientation='left'
                      style={{ color: 'gray', fontSize: '.8rem' }}
                    >
                      <FormattedMessage id='browsePage.metadata' />
                    </Divider>

                    <p>
                      <FormattedMessage id='browsePage.category' />:{' '}
                      {product.category}
                    </p>
                    <p>
                      <FormattedMessage id='browsePage.tags' />:{' '}
                      {product.tags.join(', ')}
                    </p>
                    <p>{product.copyrightUsageRules}</p>
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
