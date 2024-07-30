// src/Route/PrivateRoute.test.tsx

import { render, screen } from '@testing-library/react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import PrivateRoute from '../Route/PrivateRoute';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
  Navigate: jest.fn(),
}));

jest.mock('../contexts/UserContext', () => ({
  useUser: jest.fn(),
}));

describe('PrivateRoute', () => {
  const mockLogout = jest.fn();
  const mockNavigate = jest.fn();
  const mockLocation = { pathname: '/protected' };

  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({ logout: mockLogout });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    sessionStorage.clear();
    jest.spyOn(window, 'alert').mockImplementation(() => {}); // Mock window.alert
    jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to login if no account address in sessionStorage', () => {
    render(<PrivateRoute element={<div>Protected Content</div>} />);
    expect(Navigate).toHaveBeenCalledWith(
      {
        to: '/login',
        state: { from: mockLocation },
        replace: true,
      },
      {}
    );
  });

  it('should render element if account address exists in sessionStorage', () => {
    sessionStorage.setItem('accountAddress', 'test_address');
    render(<PrivateRoute element={<div>Protected Content</div>} />);
    expect(screen.queryByText('Protected Content')).not.toBeNull();
  });

  it('should handle account changes and call logout', () => {
    sessionStorage.setItem('accountAddress', 'test_address');
    (window.ethereum as any) = {
      on: jest.fn((event, callback) => {
        if (event === 'accountsChanged') callback(['different_address']);
      }),
      removeListener: jest.fn(),
    };

    render(<PrivateRoute element={<div>Protected Content</div>} />);

    // Simulate account change to an empty array
    (window.ethereum.on as jest.Mock).mock.calls[0][1]([]);
    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');

    // Simulate account change to a different account
    (window.ethereum.on as jest.Mock).mock.calls[0][1](['different_address']);
    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should cleanup event listener on unmount', () => {
    const removeListener = jest.fn();
    (window.ethereum as any) = { on: jest.fn(), removeListener };

    const { unmount } = render(
      <PrivateRoute element={<div>Protected Content</div>} />
    );

    unmount();
    expect(removeListener).toHaveBeenCalledWith(
      'accountsChanged',
      expect.any(Function)
    );
  });
});
