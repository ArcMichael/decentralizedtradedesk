import { render } from '@testing-library/react';
import CustomFooter from '../Layout/CustomFooter';

describe('CustomFooter', () => {
  it('renders footer content correctly', () => {
    const { getByText } = render(<CustomFooter />);
    expect(getByText('© 2024 Created by Your Company')).toBeInTheDocument();
  });
});
