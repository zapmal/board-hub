
import React from 'react';
import { Route, Redirect, } from 'react-router-dom';

import useUserStore from '../stores/useUserStore';

const PrivateRoute = ({ location, path, exact, route }) => {
  const user = useUserStore(state => state.user);

  return (
    <Route 
      path={path}
      exact={exact}
      render={props => user ? (
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

export default PrivateRoute;
