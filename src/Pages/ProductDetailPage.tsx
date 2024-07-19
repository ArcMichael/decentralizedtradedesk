// src/Pages/ProductDetailPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge, Descriptions, Divider, message, Timeline } from 'antd';
import WithCustomerLayout from '../Layout/WithCustomLayout';
import { getWeb3, getContract } from '../web3/web3Config';
import { Product, Metadata, ContractProduct } from '../interfaces';
import { defaultImage } from '../constants';
import { FormattedMessage, useIntl } from 'react-intl';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [productHistory, setProductHistory] = useState<any[]>([]);
  const intl = useIntl();

  useEffect(() => {
    const fetchProduct = async () => {
      const web3 = await getWeb3();
      if (!web3) {
        message.error(
          intl.formatMessage({ id: 'productDetailPage.web3NotInitialized' })
        );
        return;
      }

      const contract = await getContract(web3);
      if (!contract) {
        message.error(
          intl.formatMessage({ id: 'productDetailPage.failedToLoadContract' })
        );
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
            currentOwnerAddress: productData.currentOwner || '',
          });

          const events: any[] = await contract.getPastEvents('ALLEVENTS', {
            filter: { id: productData.id },
            fromBlock: 0,
            toBlock: 'latest',
          });

          console.log('events', events);

          const historyPromises = events.map(async eventsList => {
            const receipt = await web3.eth.getTransactionReceipt(
              eventsList.transactionHash
            );
            if (!receipt) {
              message.error(
                intl.formatMessage({
                  id: 'productDetailPage.transactionReceiptNotFound',
                })
              );
              return null;
            }

            let color = 'blue';
            let children = (
              <>
                <p>
                  <FormattedMessage id='productDetailPage.unknownEvent' />
                </p>
                <p>
                  <FormattedMessage id='productDetailPage.unknownDescription' />
                </p>
              </>
            );

            switch (eventsList.event) {
              case 'ProductAdded':
                color = 'green';
                children = (
                  <>
                    <p>
                      <FormattedMessage id='productDetailPage.productAdded' />
                    </p>
                    <p>
                      <FormattedMessage id='productDetailPage.from' />:{' '}
                      {receipt.from}
                    </p>
                  </>
                );
                break;
              case 'ProductUpdated':
                color = 'orange';
                children = (
                  <>
                    <p>
                      <FormattedMessage id='productDetailPage.productUpdated' />
                    </p>
                    <p>
                      <FormattedMessage id='productDetailPage.from' />:{' '}
                      {receipt.from}
                    </p>
                  </>
                );
                break;
              case 'ProductPurchased':
                color = 'blue';
                children = (
                  <>
                    <p>
                      <FormattedMessage id='productDetailPage.productPurchased' />
                    </p>
                    <p>
                      <FormattedMessage id='productDetailPage.from' />:{' '}
                      {eventsList.returnValues.buyer.toLowerCase()}
                    </p>
                  </>
                );
                break;
              default:
                color = 'gray';
                children = (
                  <>
                    <p>
                      <FormattedMessage id='productDetailPage.unknownEvent' />
                    </p>
                    <p>
                      <FormattedMessage id='productDetailPage.unknownDescription' />
                    </p>
                  </>
                );
            }

            return {
              color,
              children,
            };
          });

          const history = await Promise.all(historyPromises);

          setProductHistory(history.filter(item => item !== null));
        } else {
          message.error(
            intl.formatMessage({ id: 'productDetailPage.productNotFound' })
          );
        }
      } catch (error) {
        message.error(
          intl.formatMessage({
            id: 'productDetailPage.failedToFetchProductData',
          })
        );
      }
    };

    fetchProduct();
  }, [id, intl]);

  if (!product) {
    return (
      <div>
        <FormattedMessage id='productDetailPage.loading' />
      </div>
    );
  }

  const ProductDetailItems = [
    {
      key: '1',
      label: intl.formatMessage({ id: 'productDetailPage.id' }),
      children: product.id,
      span: 1,
    },
    {
      key: '2',
      label: intl.formatMessage({ id: 'productDetailPage.currency' }),
      children: `${product.currency}`,
      span: 1,
    },
    {
      key: '3',
      label: intl.formatMessage({ id: 'productDetailPage.price' }),
      children: `${product.price}`,
      span: 1,
    },
    {
      key: '4',
      label: intl.formatMessage({ id: 'productDetailPage.name' }),
      children: product.name,
      span: 1,
    },
    {
      key: '5',
      label: intl.formatMessage({ id: 'productDetailPage.description' }),
      children: product.description,
      span: 1,
    },
    {
      key: '6',
      label: intl.formatMessage({ id: 'productDetailPage.image' }),
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
      label: intl.formatMessage({ id: 'productDetailPage.category' }),
      children: product.category,
      span: 1,
    },
    {
      key: '8',
      label: intl.formatMessage({ id: 'productDetailPage.tags' }),
      children: product.tags.join(', '),
      span: 1,
    },
    {
      key: '9',
      label: intl.formatMessage({ id: 'productDetailPage.status' }),
      children: <Badge status='processing' text={product.transactionStatus} />,
      span: 1,
    },
    {
      key: '10',
      label: intl.formatMessage({ id: 'productDetailPage.creator' }),
      children: product.creatorAddress,
      span: 3,
    },
    {
      key: '11',
      label: intl.formatMessage({ id: 'productDetailPage.currentOwner' }),
      children: product.currentOwnerAddress,
      span: 3,
    },
    {
      key: '12',
      label: intl.formatMessage({
        id: 'productDetailPage.copyrightUsageRules',
      }),
      children: product.copyrightUsageRules,
      span: 3,
    },
  ];

  return (
    <div>
      <Descriptions
        layout='vertical'
        title={intl.formatMessage({ id: 'productDetailPage.title' })}
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

      <Timeline items={productHistory} />
    </div>
  );
};

export default WithCustomerLayout(ProductDetailPage);
