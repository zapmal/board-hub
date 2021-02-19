
import React from 'react';
import { Route, Redirect, } from 'react-router-dom';

import useUserStore from '../stores/useUserStore';

/**
 * This components does a few things.
 * 
 * 1.- Check if there's an active session, if there is, 
 * said user can access to *any* protected route (/b, /account). 
 * 
 * 2.- Checks if there's a token (if he logged in previously), if so,
 * he's redirected to home page, where its data is retrieved and its session
 * established.
 * 
 * 3.- The else-if is to avoid an infinite loop.
 * e.g: User is not logged in, there's no active session so he'll go and signup/signin,
 * but he'll be redirect over and over, infinite loop.
 */
const ProtectedRoute = ({ path, exact, route }) => {
  const activeSession = useUserStore(state => state.user);
  const isLoggedIn = localStorage.getItem('token');

  if (isLoggedIn && (path === '/signin' || path === '/signup')) {
    return <Redirect to= '/' />;
  } else if (!isLoggedIn) {
    return (
      <Route 
        path={path}
        exact={exact}
        render={props => <route.component {...props} routes={route.routes} />}
      />
    );
  }

  return (
    <Route 
      path={path}
      exact={exact}
      render={props => activeSession ? (
        <route.component 
          {...props}
          routes={route.routes}
        />
      ) : (
        <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
      )} 
    />
  );
};

export default ProtectedRoute;