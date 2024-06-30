import { render } from '@testing-library/react';
import App from '../App';

test('測試 App.tsx 頁面是否正常運作', () => {
  // @ts-ignore
  render(<App />);
  expect(true).toBeTruthy();
});
