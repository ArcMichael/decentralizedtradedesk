import { render, screen, fireEvent } from '@testing-library/react';
import CustomHeader from '../Layout/CustomHeader';
import { act } from 'react'; // 从 'react' 导入

describe('CustomHeader', () => {
  it('renders and toggles collapse state correctly', async () => {
    const toggleCollapse = jest.fn();

    render(<CustomHeader collapsed={false} toggleCollapse={toggleCollapse} />);

    const button = screen.getByRole('button'); // 使用 @testing-library/react 中的 screen
    await act(async () => {
      fireEvent.click(button);
    });

    expect(toggleCollapse).toHaveBeenCalled();
  });
});
