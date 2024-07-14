// src/Components/Breadcrumbs.tsx
import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import routes, { RouteConfig } from '../Route/routeConfig';
import { FormattedMessage, useIntl } from 'react-intl'; // Import useIntl for localization

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
  routeList: RouteConfig[],
  intl: any
): { key: string; title: React.ReactNode }[] => {
  const breadcrumbs: { key: string; title: React.ReactNode }[] = [];
  let currentPath = '';

  for (const snippet of pathSnippets) {
    currentPath += `/${snippet}`;
    const route = findRoute(currentPath, routeList);
    if (route) {
      if (route.children) {
        breadcrumbs.push({
          key: currentPath,
          title: intl.formatMessage({ id: `customsider.${route.title}` }),
        });
      } else {
        breadcrumbs.push({
          key: currentPath,
          title: (
            <Link to={currentPath}>
              {intl.formatMessage({ id: `customsider.${route.title}` })}
            </Link>
          ),
        });
      }
    }
  }

  return breadcrumbs;
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const intl = useIntl();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  const breadcrumbItems = [
    {
      key: 'home',
      title: (
        <Link to='/'>
          {' '}
          <FormattedMessage id='customsider.home' />
        </Link>
      ),
    },
    ...generateBreadcrumbs(pathSnippets, routes, intl),
  ];

  return <Breadcrumb items={breadcrumbItems} />;
};

export default Breadcrumbs;
