import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WelcomePage from '../Pages/WelcomePage';

describe('WelcomePage', () => {
  it('renders welcome page content correctly', () => {
    const { getByText } = render(
      <BrowserRouter>
        <WelcomePage />
      </BrowserRouter>
    );
    expect(getByText('Welcome to Tauri!')).toBeInTheDocument();
  });
});
