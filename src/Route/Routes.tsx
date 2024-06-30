import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage';
import WelcomePage from './WelcomePage';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/welcome' element={<WelcomePage />} />
        {/* 添加更多路由 */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
