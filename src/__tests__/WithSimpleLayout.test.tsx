// src/__tests__/WithSimpleLayout.test.tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WithSimpleLayout from '../Layout/WithSimpleLayout';
import { act } from 'react'; // 从 'react' 导入

const MockComponent: React.FC = () => <div>Mock Component</div>;
const WrappedComponent = WithSimpleLayout(MockComponent);

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
