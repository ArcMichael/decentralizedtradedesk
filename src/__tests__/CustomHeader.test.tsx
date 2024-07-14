// src/__tests__/CustomHeader.test.tsx

import { render, screen, fireEvent, act } from '@testing-library/react';
import CustomHeader from '../Layout/CustomHeader';
// import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../contexts/LanguageContext';

describe('CustomHeader', () => {
  it('renders and toggles collapse state correctly', async () => {
    const toggleCollapse = jest.fn();

    render(
      <MemoryRouter>
        <LanguageProvider>
          <CustomHeader collapsed={false} toggleCollapse={toggleCollapse} />
        </LanguageProvider>
      </MemoryRouter>
    );

    const button = screen.getByTestId('collapse-toggle-button');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(toggleCollapse).toHaveBeenCalled();
  });
});
