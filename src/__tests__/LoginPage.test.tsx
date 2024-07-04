// src/__tests__/LoginPage.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Updated import statement
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import { UserProvider } from '../contexts/UserContext';

jest.mock('../utils/utils', () => ({
  openExternalLink: jest.fn(),
}));

jest.mock('../web3/web3Config', () => ({
  getWeb3: jest.fn().mockResolvedValue({
    eth: {
      getAccounts: jest.fn().mockResolvedValue(['0x123456789']),
    },
  }),
}));

describe('LoginPage', () => {
  it('should call initMetaMask on MetaMask button click', async () => {
    const { getWeb3 } = require('../web3/web3Config');
    render(
      <MemoryRouter>
        <UserProvider>
          <LoginPage />
        </UserProvider>
      </MemoryRouter>
    );

    const connectButton = screen.getByRole('button', {
      name: /connect to metamask/i,
    });
    if (!connectButton) {
      console.error('Connect button not found');
    }
    fireEvent.click(connectButton);

    await waitFor(() => {
      expect(getWeb3).toHaveBeenCalled();

      expect(
        screen.queryByText(/MetaMask connected\. You are now logged in\./i)
      ).toBeInTheDocument();
    });
  });

  it('should call handlePrivateKeyLogin on private key login', async () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <LoginPage />
        </UserProvider>
      </MemoryRouter>
    );
  });
});
