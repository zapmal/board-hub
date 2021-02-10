import React from 'react';
import { useMutation } from 'react-query';

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
  const { mutateAsync } = useMutation(data => apiClient.post('/signup', data)); 

  const handleSubmit = async (data, { setStatus, resetForm, setSubmitting }) => {
    try {
      setSubmitting(true);

      await mutateAsync(data);
      setSubmitting(false);

      resetForm();

      /**
       * - Store token in local storage.
       * - Redirect to home page.
       */
    }
    catch (error) {
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