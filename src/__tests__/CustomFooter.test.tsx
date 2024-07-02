// src/__tests__/CustomFooter.test.tsx

import { render, screen } from '@testing-library/react';
import CustomFooter from '../Layout/CustomFooter';

describe('CustomFooter', () => {
  it('renders footer content correctly', () => {
    render(<CustomFooter />);
    expect(screen.getByText('Site Map and Features')).toBeInTheDocument();
    expect(
      screen.getByText(
        "Our platform is structured to provide a seamless experience across various functionalities. Here's an overview:"
      )
    ).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Explore')).toBeInTheDocument();
  });
});
