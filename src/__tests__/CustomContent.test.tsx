// src/__tests__/CustomContent.test.tsx

import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import this to include the matchers
import { MemoryRouter } from 'react-router-dom';
import CustomContent from '../Layout/CustomContent';

describe('CustomContent', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CustomContent>Test Content</CustomContent>
      </MemoryRouter>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
