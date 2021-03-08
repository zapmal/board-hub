import React from 'react';
import Grid from '@material-ui/core/Grid';
import RepeatIcon from '@material-ui/icons/Repeat';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { UpdateForm } from 'components/account';
import { CustomField } from 'components/common';

import { updateUsernameSchema } from 'utils/validation/account';

const ChangeUsername = () => {
  return (
    <UpdateForm
      route='username'
      validationSchema={updateUsernameSchema}
    >
      <Layout />
    </UpdateForm>
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
          type='text'
          label='Nombre de Usuario'
          name='username'
          color='secondary'
        />
      </Grid>
      <Grid item xs={1}>
        <RepeatIcon fontSize='large' color='secondary' />
      </Grid>
      <Grid item xs={11}>
        <CustomField 
          fullWidth
          variant='outlined'
          type='text'
          label='Confirmación de nombre de usuario'
          name='usernameConfirmation'
          color='secondary'
        />
      </Grid>
    </>
  );
};

export default ChangeUsername;