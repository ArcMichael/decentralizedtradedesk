// src/Route/Routes.tsx

import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import routeConfig, { RouteConfig } from './routeConfig';

const renderRoutes = (routes: RouteConfig[]) =>
  routes.map(route => (
    <Route key={route.path} path={route.path} element={route.element}>
      {route.children &&
        route.children.map(child => (
          <Route key={child.path} path={child.path} element={child.element} />
        ))}
    </Route>
  ));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>{renderRoutes(routeConfig)}</Routes>
    </Suspense>
  );
};

export default AppRoutes;
