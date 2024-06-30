import { render, screen } from '@testing-library/react';
import CustomSider from '../Layout/CustomSider';
import { act } from 'react'; // 从 'react' 导入

describe('CustomSider', () => {
  it('renders menu items correctly', async () => {
    await act(async () => {
      render(<CustomSider collapsed={false} />);
    });

    expect(screen.getByText('nav 1')).toBeInTheDocument();
    expect(screen.getByText('nav 2')).toBeInTheDocument();
    expect(screen.getByText('nav 3')).toBeInTheDocument();
  });
});
