
import React from 'react';
import { Route, Redirect, } from 'react-router-dom';

import useUserStore from '../stores/useUserStore';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useUserStore(state => state.user);

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect 
            to={{ pathname: '/signin', state: { from:  props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
