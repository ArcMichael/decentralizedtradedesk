import React from 'react';
import { Button, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import UserMenu from '../Components/UserMenu';
import { useLanguage } from '../contexts/LanguageContext';
import { useSider } from '../contexts/SiderContext';

const { Header } = Layout;

const CustomHeader: React.FC<{ showUserMenu?: boolean }> = ({
  showUserMenu = true,
}) => {
  const { locale, setLocale } = useLanguage();
  const { collapsed, setCollapsed } = useSider();

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'zh' : 'en');
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
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
        <Button
          type='text'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapse}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
          data-testid='collapse-toggle-button'
        />
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
