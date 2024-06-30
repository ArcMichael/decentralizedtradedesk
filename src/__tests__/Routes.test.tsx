import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react';
import Routes from '../Route/Routes';

describe('Routes', () => {
  it('renders routes without crashing', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      );
    });
  });
});
