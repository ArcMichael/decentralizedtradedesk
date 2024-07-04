// src/__tests__/CustomHeader.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import CustomHeader from '../Layout/CustomHeader';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

describe('CustomHeader', () => {
  it('renders and toggles collapse state correctly', async () => {
    const toggleCollapse = jest.fn();

    render(
      <MemoryRouter>
        {' '}
        {/* Wrap your component with MemoryRouter */}
        <CustomHeader collapsed={false} toggleCollapse={toggleCollapse} />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(toggleCollapse).toHaveBeenCalled();
  });
});
