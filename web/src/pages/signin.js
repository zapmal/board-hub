import React from 'react';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { signinSchema } from '../utils/validation/auth';

import { AuthForm } from 'components/account';
import { CustomField } from 'components/common';

const Signin = () => {
  return (
    <AuthForm
      route='signin'
      validationSchema={signinSchema}
      maxWidth={500}
    >
      <Layout />
    </AuthForm>
  );
};

const Layout = () => {
  return (
    <> 
      <Grid item xs={1}>
        <AccountCircle fontSize='large' color='secondary' />
      </Grid>
      <Grid item xs={11}>
        <CustomField 
          fullWidth
          variant='outlined'
          type='email'
          label='Email'
          name='email'
          color='secondary'
        />
      </Grid>
      <Grid item xs={1}>
        <VpnKeyIcon fontSize='large' color='secondary' />
      </Grid>
      <Grid item xs={11}>
        <CustomField 
          fullWidth
          variant='outlined'
          type='password'
          label='Password'
          name='password'
          color='secondary'
        />
      </Grid>
    </>
  );
};

export default Signin;