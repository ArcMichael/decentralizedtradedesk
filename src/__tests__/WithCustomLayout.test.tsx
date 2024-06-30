import { render, screen } from '@testing-library/react';
import WithCustomerLayout from '../Layout/WithCustomLayout';
import { act } from 'react'; // 从 'react' 导入

const MockComponent: React.FC = () => <div>Mock Component</div>;
const WrappedComponent = WithCustomerLayout(MockComponent);

describe('WithCustomerLayout', () => {
  it('renders wrapped component correctly', async () => {
    await act(async () => {
      render(<WrappedComponent />);
    });

    expect(screen.getByText('Mock Component')).toBeInTheDocument();
  });
});
