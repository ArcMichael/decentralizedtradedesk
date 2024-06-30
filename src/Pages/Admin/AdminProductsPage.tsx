import React from 'react';
import WithCustomLayout from '../../Layout/WithCustomLayout';

const AdminProductsPage: React.FC = () => {
  console.log('AdminProductsPage rendered');
  return <div>AdminProductsPage</div>;
};

export default WithCustomLayout(AdminProductsPage);
