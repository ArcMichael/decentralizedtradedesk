// src/Layout/CustomHeader.tsx

import React from 'react';
import { Button, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import UserMenu from '../Components/UserMenu';
import { useLanguage } from '../contexts/LanguageContext';

const { Header } = Layout;

interface CustomHeaderProps {
  collapsed?: boolean;
  toggleCollapse?: () => void;
  showUserMenu?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  collapsed,
  toggleCollapse,
  showUserMenu = true,
}) => {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'zh' : 'en');
  };

  return (
    <Header
      style={{
        padding: 0,
        background: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {toggleCollapse && (
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapse}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        )}
        <Button onClick={toggleLanguage} style={{ marginLeft: '16px' }}>
          {locale === 'en' ? '切换到中文' : 'Switch to English'}
        </Button>
      </div>
      {showUserMenu && (
        <div style={{ marginRight: '16px' }}>
          <UserMenu />
        </div>
      )}
    </Header>
  );
};

export default CustomHeader;
