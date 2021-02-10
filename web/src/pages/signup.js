import React from 'react';

import { signupSchema } from '../libs/validation/auth';
import apiClient from '../services/api';

import AuthForm from '../components/AuthForm';

/**
 * TODO-LIST:
 * [0]: Context(?), react-query(?)
 * [1]: Redirect after successful register to '/home'. Don't store the JWT, yet.
 * [3]: While the data is being sent (isSubmitting) show loading component.
 */

const Signup = () => {

  const handleSubmit = async (data, { setStatus, resetForm, setSubmitting }) => {
    try {
      const {
        data: { token },
        status,
      } = await apiClient.post('/signup', data);

      if (status === 200) {
        console.log('bipity bopity storing the tokity');
        console.log(token);
        resetForm();
        /**
         * Here a context-level method (could) be called. 
         * That method could store the JWT, or it can be done without 
         * relying on context at all.
         */
      }
    }
    catch (error) {
      console.log(error);
      setStatus(error.response.data.message);
    }
  };

  return (
    <AuthForm 
      type='signup' 
      validationSchema={signupSchema} 
      handleSubmit={handleSubmit}
    />
  );
};

export default Signup;