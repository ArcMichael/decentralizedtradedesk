import { render } from '@testing-library/react';
import CustomContent from '../Layout/CustomContent';

describe('CustomContent', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<CustomContent>Test Content</CustomContent>);
    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
