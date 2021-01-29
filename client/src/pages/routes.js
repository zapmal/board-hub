import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './home';
import About from './about';

const RouteWithSubRoutes = (route) => {
  return (
    <Route 
      path={route.path}
      exact={route.exact}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  );
};

export const RenderRoutes = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route, index) => (
        <RouteWithSubRoutes key={route.key} {...route} />
      ))}
      <Route component={() => <h1>404 Not Found.</h1>} />
    </Switch>
  );
};

const ROUTES = [
  { path: '/', key: 'ROOT', exact: true, component: Home },
  { path: '/about', key: 'ABOUT_US', component: About },
  { path: '/contact', key: 'CONTACT', component: () => <h1>Contact</h1> },
  { path: '/opensource', key: 'OPEN_SOURCE', component: () => <h1>Open Source</h1> },
  { path: '/signin', key: 'SIGN_IN', component: () => <h1>Sign In</h1> },
  { path: '/signup', key: 'SIGN_UP', component: () => <h1>Sign Up</h1> },
  { 
    path: '/b', 
    key: 'BOARDS', 
    component: RenderRoutes,
    routes: [
      {
        path: '/b',
        key: 'BOARDS_ROOT',
        exact: true,
        component: () => <h1>Boards</h1>
      },
      {
        path: '/b/:id',
        key: 'BOARD',
        exact: true,
        component: () => <h1>Board</h1>
      }
    ]
  },
];

export default ROUTES;