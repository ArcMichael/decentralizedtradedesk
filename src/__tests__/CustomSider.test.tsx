// __tests__/CustomSider.test.ts

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CustomSider from '../Layout/CustomSider';
import { act } from 'react';

describe('CustomSider', () => {
  it('renders menu items correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <CustomSider collapsed={false} />
        </MemoryRouter>
      );
    });

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Browse')).toBeInTheDocument();
  });
});
