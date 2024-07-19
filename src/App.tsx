// src/App.tsx

import './App.css';
import AppRoutes from './Route/Routes';
import { SiderProvider } from './contexts/SiderContext';
import { UserProvider } from './contexts/UserContext'; // 确保你已经创建了这个 Context
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <UserProvider>
          <SiderProvider>
            <AppRoutes />
          </SiderProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
