import React from 'react';

import { signinSchema } from '../libs/validation/auth';
import apiClient from '../services/api';

import AuthForm from '../components/AuthForm';

const Signin = () => {
  const handleSubmit = async (data, { setStatus, resetForm, setSubmitting }) => {
    try {
      const { 
        data: { token }, 
        status 
      } = await apiClient.post('/signin', data);
    
      if (status === 200) {
        console.log('beep boop magic happening, im storing the token');
        console.log(token, status);
      }
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