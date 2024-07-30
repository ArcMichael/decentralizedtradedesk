// src/Route/Routes.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../Route/Routes';
// import routeConfig from '../Route/routeConfig';

jest.mock('./routeConfig', () => [
  {
    path: '/',
    element: <div>Home Component</div>,
    children: [
      {
        path: 'about',
        element: <div>About Component</div>,
      },
    ],
  },
  {
    path: '/contact',
    element: <div>Contact Component</div>,
  },
]);

describe('AppRoutes', () => {
  it('should render the Home component for the root path', () => {
    render(
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
    expect(screen.getByText('Home Component')).toBeInTheDocument();
  });

  it('should render the About component for the /about path', () => {
    window.history.pushState({}, 'About', '/about');
    render(
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
    expect(screen.getByText('About Component')).toBeInTheDocument();
  });

  it('should render the Contact component for the /contact path', () => {
    window.history.pushState({}, 'Contact', '/contact');
    render(
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
    expect(screen.getByText('Contact Component')).toBeInTheDocument();
  });

  it('should show loading fallback while waiting for components to load', () => {
    const SuspenseTestComponent = React.lazy(
      () => import('./SuspenseTestComponent')
    );
    jest.mock('./routeConfig', () => [
      {
        path: '/',
        element: <SuspenseTestComponent />,
      },
    ]);

    render(
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
