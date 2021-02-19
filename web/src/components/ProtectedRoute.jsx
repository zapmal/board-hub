import React from 'react';
import { Route, Redirect, } from 'react-router-dom';

import useUserStore from '../stores/useUserStore';

const ProtectedRoute = ({ path, exact, route }) => {
  const activeSession = useUserStore(state => state.user);
  const isLoggedIn = localStorage.getItem('token');
  const isAccessPage = (path === '/signin' || path === '/signup');

  if (isLoggedIn && isAccessPage) {
    return <Redirect to= '/' />;
  } else if (!isLoggedIn && isAccessPage) {
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