// src/__tests__/CustomContent.test.tsx

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import CustomContent from '../Layout/CustomContent';
import { IntlProvider } from 'react-intl';
import { messages } from '../locales';
// Assuming you have a translation file

describe('CustomContent', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <IntlProvider locale='en' messages={messages.en}>
          <CustomContent>Test Content</CustomContent>
        </IntlProvider>
      </MemoryRouter>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
