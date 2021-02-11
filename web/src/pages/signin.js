import React from 'react';

import { signinSchema } from '../libs/validation/auth';

import AuthForm from '../components/AuthForm';

/**
 * - Move handleSubmit to AuthForm. [done]
 * - Rename type to "formType" or "route". [done]
 * 
 * - Double-check controllerHandler and signin controller.
 * - Translate backend validations.
 * - Store JWT in LS.
 * - Context (?).
 * - Redirect after successful signin/signup.
 * - Loading component.
 */

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