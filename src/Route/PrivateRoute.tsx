// src/Route/PrivateRoute.tsx

import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const accountAddress = sessionStorage.getItem('accountAddress');
  const sessionAccountAddress = sessionStorage.getItem('accountAddress');
  const location = useLocation();

  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    console.log('Logged out');
    navigate('/login');
  };

  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        console.log(
          'MetaMask is locked or the user has not connected any accounts'
        );
        handleLogout();
        // window.location.href = '/login';
      } else {
        const currentAccount = accounts[0];
        console.log('Current account:', currentAccount);

        if (sessionAccountAddress && currentAccount !== sessionAccountAddress) {
          alert('Account has changed. You will be redirected to login page ');
          handleLogout();
        }
      }
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          'accountsChanged',
          handleAccountsChanged
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionAccountAddress]);

  if (!accountAddress) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return element;
};

export default PrivateRoute;
