// src/Route/Routes.tsx

import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import routeConfig from './routeConfig';

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routeConfig.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
