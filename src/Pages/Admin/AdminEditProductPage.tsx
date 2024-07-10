// src/Pages/Admin/AdminEditProductPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Form,
  Input,
  Button,
  message,
  Select,
  Checkbox,
  Row,
  Col,
  Dropdown,
  Space,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import WithCustomLayout from '../../Layout/WithCustomLayout';
import { getWeb3, getContract } from '../../web3/web3Config';
import { ProductData } from '../../interfaces';
import { menuItems } from '../../constants';
import { generateHashAndSignature } from '../../utils/web3Utils';

const { Title } = Typography;
const { Option } = Select;

const AdminEditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductData | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
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

      try {
        const productData: any = await contract.methods.products(id).call();
        if (productData) {
          console.log(productData);
          const metadata = JSON.parse(productData.metadata);
          setProduct({
            productId: productData.id,
            name: productData.name,
            description: productData.description,
            price: parseFloat(web3.utils.fromWei(productData.price, 'ether')),
            metadata,
            currentOwner: productData.currentOwner,
            creator: productData.creator,
            transactionConditions: {
              fixedPricePayment: productData.details.fixedPricePayment,
            },
            copyrightUsageRules: productData.copyrightUsageRules,
            currency: productData.details.currency,
            hash: productData.details.hash,
            digitalSignature: productData.details.digitalSignature,
            createdAt: new Date(
              parseInt(productData.createdAt, 10)
            ).toISOString(),
            authorizationRecord: productData.authorizationRecord,
          });
        } else {
          message.error('Product not found');
          navigate('/admin/products');
        }
      } catch (error) {
        message.error('Failed to fetch product data.');
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (product) {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
    }
  };

  const handleMetadataChange = (name: string, value: string | string[]) => {
    if (product) {
      setProduct({
        ...product,
        metadata: { ...product.metadata, [name]: value },
      });
    }
  };

  const handleSelectChange = (value: string) => {
    if (product) {
      setProduct({ ...product, currency: value });
    }
  };

  const handleCheckboxChange = (checkedValues: any) => {
    if (product) {
      const fixedPricePayment = checkedValues.includes('fixedPricePayment');
      setProduct({
        ...product,
        transactionConditions: {
          fixedPricePayment,
        },
      });
    }
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    if (product) {
      setProduct({ ...product, copyrightUsageRules: key });
    }
  };

  const handleSubmit = async () => {
    if (!product) return;

    const currentTimestamp = new Date().toISOString();
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

      const { hash, signature } = await generateHashAndSignature(
        product.currentOwner
      );

      const updatedProduct = {
        ...product,
        createdAt: currentTimestamp,
        hash,
        digitalSignature: signature as string,
        price: Number(product.price),
      };

      setProduct(updatedProduct);

      const additionalDetails = {
        fixedPricePayment:
          updatedProduct.transactionConditions.fixedPricePayment,
        currency: updatedProduct.currency,
        hash: updatedProduct.hash,
        digitalSignature: updatedProduct.digitalSignature,
      };

      const tx = contract.methods.updateProduct(
        updatedProduct.productId,
        updatedProduct.name,
        updatedProduct.description,
        web3.utils.toWei(updatedProduct.price.toString(), 'ether'),
        JSON.stringify(updatedProduct.metadata),
        Date.parse(updatedProduct.createdAt),
        updatedProduct.currentOwner,
        updatedProduct.copyrightUsageRules,
        additionalDetails
      );

      const gas = await tx.estimateGas({ from: accounts[0] });

      await tx.send({
        from: accounts[0],
        gas: gas.toString(),
      });

      message.success('Product updated successfully');
      navigate('/admin/products');
    } catch (error: unknown) {
      const errMsg = (error as Error).message;
      console.error('Error updating product:', errMsg);
      message.error('Failed to update product.');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Edit Product</Title>
      {product && (
        <Form layout='vertical' onFinish={handleSubmit}>
          <Title level={3}>基本信息</Title>
          <Form.Item label='商品ID'>
            <Input name='productId' value={product.productId} disabled />
          </Form.Item>
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
          <Form.Item label='元数据'>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label='类别'>
                  <Select
                    value={product.metadata.category}
                    onChange={value => handleMetadataChange('category', value)}
                  >
                    <Option value='游戏皮肤'>游戏皮肤</Option>
                    <Option value='其他类别'>其他类别</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label='标签'>
                  <Input
                    placeholder='请输入标签, 用逗号隔开'
                    value={product.metadata.tags.join(',')}
                    onChange={e =>
                      handleMetadataChange(
                        'tags',
                        e.target.value.split(',').map(tag => tag.trim())
                      )
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label='图片URL'>
                  <Input
                    placeholder='请输入图片URL'
                    value={product.metadata.imageUrl}
                    onChange={e =>
                      handleMetadataChange('imageUrl', e.target.value)
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Title level={3}>所有权和授权</Title>
          <Form.Item label='当前所有者' required>
            <Input name='currentOwner' value={product.currentOwner} disabled />
          </Form.Item>
          <Form.Item label='创作者' required>
            <Input name='creator' value={product.creator} disabled />
          </Form.Item>

          <Title level={3}>交易信息</Title>

          <Form.Item label='货币类型'>
            <Select
              value={product.currency}
              onChange={handleSelectChange}
              disabled
            >
              <Option value='ETH'>ETH</Option>
              <Option value='BTC'>BTC</Option>
            </Select>
          </Form.Item>

          <Form.Item label='价格' required>
            <Input
              type='number'
              name='price'
              value={product.price}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Title level={3}>安全和验证</Title>
          <Form.Item label='哈希值'>
            <Input name='hash' value={product.hash} disabled />
          </Form.Item>
          <Form.Item label='数字签名'>
            <Input
              name='digitalSignature'
              value={product.digitalSignature}
              disabled
            />
          </Form.Item>

          <Title level={3}>智能合约规则</Title>
          <Form.Item label='交易条件'>
            <Checkbox.Group
              value={
                product.transactionConditions.fixedPricePayment
                  ? ['fixedPricePayment']
                  : []
              }
              onChange={handleCheckboxChange}
            >
              <Row>
                <Col span={24}>
                  <Checkbox value='fixedPricePayment'>固定价格支付</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label='版权和使用权规则'>
            <Dropdown
              menu={{ items: menuItems, onClick: handleMenuClick }}
              trigger={['click']}
            >
              <button
                onClick={e => e.preventDefault()}
                style={{ all: 'unset', cursor: 'pointer' }}
              >
                <Space>
                  {product.copyrightUsageRules}
                  <DownOutlined />
                </Space>
              </button>
            </Dropdown>
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
