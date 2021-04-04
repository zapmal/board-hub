import React from 'react';
import { 
  Grid, 
  Typography,
} from '@material-ui/core';

import { signupSchema } from '../utils/validation/auth';

import { AuthForm } from 'components/account';
import { CustomField } from 'components/common';

const Signup = () => {
  return (
    <AuthForm 
      route='signup' 
      validationSchema={signupSchema} 
    >
      <Layout />
    </AuthForm>
  );
};

const Layout = () => {
  return (
    <>
      <Grid item xs={6}>
        <CustomField 
          fullWidth
          variant='outlined'
          type='email'
          label='Email'
          name='email'
          color='secondary'
        />
      </Grid>
      <Grid item xs={6}>
        <CustomField 
          fullWidth
          type='text'
          variant='outlined'
          label='Nombre de usuario'
          name='username'
          color='secondary'
        />
      </Grid>
      <Grid item xs={6}>
        <CustomField 
          fullWidth
          variant='outlined'
          type='password'
          label='Contraseña'
          name='password'
          color='secondary'
        />
      </Grid>
      <Grid item xs={6}>
        <CustomField 
          fullWidth
          variant='outlined'
          type='password'
          label='Confirmación de contraseña'
          name='passwordConfirmation'
          color='secondary'
        />
      </Grid>
      <Grid item xs={12}>
        <CustomField 
          fullWidth
          type='text'
          variant='outlined'
          label='Nombre Completo'
          name='fullname'
          color='secondary'
        />
      </Grid>
    </>
  );
};

export default Signup;
