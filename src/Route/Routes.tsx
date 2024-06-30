import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import routeConfig, { RouteConfig } from './routeConfig';

const renderRoutes = (routes: RouteConfig[], parentPath: string = '') =>
  routes.map(route => {
    const fullPath = parentPath ? `${parentPath}/${route.path}` : route.path;
    console.log(`Rendering route: ${fullPath}`); // Debugging log
    if (route.subRoutes) {
      return (
        <Route key={fullPath} path={fullPath} element={route.element}>
          {renderRoutes(route.subRoutes, fullPath)}
        </Route>
      );
    }
    return <Route key={fullPath} path={fullPath} element={route.element} />;
  });

const AppRoutes: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>{renderRoutes(routeConfig)}</Routes>
  </Suspense>
);

export default AppRoutes;
