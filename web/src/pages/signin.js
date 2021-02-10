import React from 'react';
import { useMutation } from 'react-query';

import { signinSchema } from '../libs/validation/auth';
import apiClient from '../services/api';

import AuthForm from '../components/AuthForm';

const Signin = () => {
  const { mutateAsync } = useMutation(data => apiClient.post('/signin', data)); 

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
      type='signin'
      validationSchema={signinSchema}
      handleSubmit={handleSubmit}
      maxWidth={500}
    />
  );
};

export default Signin;