import React from 'react';

import { signinSchema } from '../utils/validation/auth';

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