// src/Route/PrivateRoute.tsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const accountAddress = localStorage.getItem('accountAddress');
  const location = useLocation();

  if (!accountAddress) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return element;
};

export default PrivateRoute;
