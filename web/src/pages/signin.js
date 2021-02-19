import React from 'react';

import { signinSchema } from '../libs/validation/auth';

import AuthForm from '../components/AuthForm';

const Signin = () => {
  return (
    <AuthForm
      route='signin'
      validationSchema={signinSchema}
      maxWidth={500}
    />
  );
};

export default Signin;