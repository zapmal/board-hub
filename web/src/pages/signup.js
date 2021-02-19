import React from 'react';
import { Redirect } from 'react-router-dom';

import { signupSchema } from '../libs/validation/auth';

import AuthForm from '../components/AuthForm';

const Signup = () => {
  const isLoggedIn = localStorage.getItem('token');

  if (isLoggedIn) {
    return <Redirect to='/'/>;
  }

  return (
    <AuthForm 
      route='signup' 
      validationSchema={signupSchema} 
    />
  );
};

export default Signup;