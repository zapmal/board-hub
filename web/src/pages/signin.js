import React from 'react';
import { Redirect } from 'react-router-dom';

import { signinSchema } from '../libs/validation/auth';

import AuthForm from '../components/AuthForm';

const Signin = () => {
  const isLoggedIn = localStorage.getItem('token');

  if (isLoggedIn) {
    return <Redirect to='/'/>;
  }

  return (
    <AuthForm
      route='signin'
      validationSchema={signinSchema}
      maxWidth={500}
    />
  );
};

export default Signin;