// src/Pages/Admin/AdminAddProductPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '../../contexts/UserContext';
import { ProductData } from '../../interfaces';
import { menuItems, initialProductState } from '../../constants';
import { generateHashAndSignature } from '../../utils/web3Utils';

const { Title } = Typography;
const { Option } = Select;

const AdminAddProductPage: React.FC = () => {
  const { user } = useUser();
  const [product, setProduct] = useState<ProductData>({
    ...initialProductState,
    productId: uuidv4(),
  });

  useEffect(() => {
    if (user?.address) {
      setProduct(prevProduct => ({
        ...prevProduct,
        currentOwner: user.address,
        creator: user.address,
      }));
    }
  }, [user]);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleMetadataChange = (name: string, value: string | string[]) => {
    setProduct({
      ...product,
      metadata: { ...product.metadata, [name]: value },
    });
  };

  const handleSelectChange = (value: string) => {
    setProduct({ ...product, currency: value });
  };

  const handleCheckboxChange = (checkedValues: any) => {
    const fixedPricePayment = checkedValues.includes('fixedPricePayment');
    setProduct({
      ...product,
      transactionConditions: {
        fixedPricePayment,
      },
    });
  };

  const saveProduct = async (productData: ProductData) => {
    message.info(JSON.stringify(productData));
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

    const additionalDetails = {
      fixedPricePayment: productData.transactionConditions.fixedPricePayment,
      currency: productData.currency,
      hash: productData.hash,
      digitalSignature: productData.digitalSignature,
    };

    try {
      console.log('Product data being sent:', productData);
      console.log('Additional details:', additionalDetails);

      const parsedPrice = web3.utils.toWei(
        productData.price.toString(),
        'ether'
      );
      const parsedCreatedAt = Date.parse(productData.createdAt);
      if (isNaN(parsedCreatedAt)) {
        throw new Error('Invalid createdAt date.');
      }

      const tx = contract.methods.addProduct(
        productData.productId,
        productData.name,
        productData.description,
        parsedPrice,
        JSON.stringify(productData.metadata), // Convert metadata to string
        parsedCreatedAt,
        productData.currentOwner,
        additionalDetails,
        productData.authorizationRecord || '' // Pass empty string if null
      );

      // console.log()

      const gas = await tx.estimateGas({ from: accounts[0] });

      await tx.send({
        from: accounts[0],
        gas: gas.toString(),
      });

      message.success('Product added successfully');
      navigate('/admin/products');
    } catch (error: unknown) {
      const errMsg = (error as Error).message;
      console.error('Error adding product:', errMsg);
      message.error('Failed to add product.');
    }
  };

  const handleSubmit = async () => {
    const currentTimestamp = new Date().toISOString();
    try {
      const { hash, signature } = await generateHashAndSignature(
        product.currentOwner
      );
      const updatedProduct = {
        ...product,
        createdAt: currentTimestamp,
        hash,
        digitalSignature: signature as string,
        price: Number(product.price), // Ensure price is a number
      };
      setProduct(updatedProduct);
      await saveProduct(updatedProduct);
    } catch (error: unknown) {
      const errMsg = (error as Error).message;
      message.error(errMsg);
    }
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    setProduct({ ...product, copyrightUsageRules: key });
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Add Product</Title>
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
                  value={product.metadata.tags.join(',')} // Convert array to comma-separated string
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
          <Checkbox.Group onChange={handleCheckboxChange}>
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
          上架商品
        </Button>
      </Form>
    </div>
  );
};

export default WithCustomLayout(AdminAddProductPage);
