// src/__tests__/WithSimpleLayout.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import this to include the matchers
import { MemoryRouter } from 'react-router-dom';
import WithSimpleLayout from '../Layout/WithSimpleLayout';
import { act } from 'react';

const MockComponent: React.FC = () => <div>Mock Component</div>;
const WrappedComponent = WithSimpleLayout(MockComponent);

beforeAll(() => {
  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('WithSimpleLayout', () => {
  it('renders wrapped component correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <WrappedComponent />
        </MemoryRouter>
      );
    });

    expect(screen.getByText('Mock Component')).toBeInTheDocument();
  });
});
