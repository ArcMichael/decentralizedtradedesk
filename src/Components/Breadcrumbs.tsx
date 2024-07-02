// src/Components/Breadcrumbs.tsx
import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import routes, { RouteConfig } from '../Route/routeConfig';

const findRoute = (
  path: string,
  routeList: RouteConfig[]
): RouteConfig | undefined => {
  for (const route of routeList) {
    if (route.path === path) return route;
    if (route.children) {
      const found = findRoute(path, route.children);
      if (found) return found;
    }
  }
  return undefined;
};

const generateBreadcrumbs = (
  pathSnippets: string[],
  routeList: RouteConfig[]
): React.ReactElement[] => {
  const breadcrumbs: React.ReactElement[] = [];
  let currentPath = '';

  for (const snippet of pathSnippets) {
    currentPath += `/${snippet}`;
    const route = findRoute(currentPath, routeList);
    if (route) {
      if (route.children) {
        breadcrumbs.push(
          <Breadcrumb.Item key={currentPath}>{route.title}</Breadcrumb.Item>
        );
      } else {
        breadcrumbs.push(
          <Breadcrumb.Item key={currentPath}>
            <Link to={currentPath}>{route.title}</Link>
          </Breadcrumb.Item>
        );
      }
    }
  }

  return breadcrumbs;
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  const breadcrumbItems: React.ReactElement[] = [
    <Breadcrumb.Item key='home'>
      <Link to='/'>Home</Link>
    </Breadcrumb.Item>,
  ].concat(generateBreadcrumbs(pathSnippets, routes));

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>
  );
};

export default Breadcrumbs;
