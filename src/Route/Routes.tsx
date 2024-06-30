// src/Route/Routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import WelcomePage from './WelcomePage';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/welcome' element={<WelcomePage />} />
    {/* 添加更多路由 */}
  </Routes>
);

export default AppRoutes;
