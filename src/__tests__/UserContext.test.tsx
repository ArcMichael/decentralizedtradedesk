// src/contexts/UserContext.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserProvider, useUser } from '../contexts/UserContext';

const TestComponent: React.FC = () => {
  const { user, login, logout } = useUser();

  return (
    <div>
      <div data-testid='user-address'>{user ? user.address : 'No user'}</div>
      <button onClick={() => login('test_address')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('UserContext', () => {
  it('should have no user initially', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    expect(screen.getByTestId('user-address').textContent).toBe('No user');
  });

  it('should login a user', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    fireEvent.click(screen.getByText('Login'));

    expect(screen.getByTestId('user-address').textContent).toBe('test_address');
    expect(sessionStorage.getItem('accountAddress')).toBe('test_address');
  });

  it('should logout a user', () => {
    sessionStorage.setItem('accountAddress', 'test_address');

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    fireEvent.click(screen.getByText('Logout'));

    expect(screen.getByTestId('user-address').textContent).toBe('No user');
    expect(sessionStorage.getItem('accountAddress')).toBeNull();
  });

  it('should load user from sessionStorage on init', () => {
    sessionStorage.setItem('accountAddress', 'stored_address');

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    expect(screen.getByTestId('user-address').textContent).toBe(
      'stored_address'
    );
  });
});
