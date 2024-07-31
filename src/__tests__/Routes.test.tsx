// src/__tests__/Routes.test.tsx

import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from '../Route/Routes';
import '@testing-library/jest-dom';
import { SiderProvider } from '../contexts/SiderContext';
import { UserProvider } from '../contexts/UserContext';

jest.mock('../Route/routeConfig', () => [
  {
    path: '/',
    element: <div>Home Component</div>,
  },
  {
    path: '/browse',
    element: <div>Browse Component</div>,
  },
]);

const renderWithProviders = (initialEntries: string[]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <UserProvider>
        <SiderProvider>
          <Routes>
            <Route path='/*' element={<AppRoutes />} />
          </Routes>
        </SiderProvider>
      </UserProvider>
    </MemoryRouter>
  );
};

describe('AppRoutes', () => {
  it('should render the Home component for the root path', () => {
    renderWithProviders(['/']);
    expect(screen.getByText('Home Component')).toBeInTheDocument();
  });

  it('should render the browse component for the /browse path', () => {
    renderWithProviders(['/browse']);
    expect(screen.getByText('Browse Component')).toBeInTheDocument();
  });
});
