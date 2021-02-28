import React from 'react';
import Grid from '@material-ui/core/Grid';
import RepeatIcon from '@material-ui/icons/Repeat';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import UpdateForm from 'components/Forms/UpdateForm';
import CustomField from 'components/CustomField';

import { updatePasswordSchema } from 'utils/validation/account';

const ChangeUsername = () => {
  return (
    <UpdateForm
      route='password'
      validationSchema={updatePasswordSchema}
    >
      <Layout />
    </UpdateForm>
  );
};

const Layout = () => {
  return (
    <> 
      <Grid item xs={1}>
        <VpnKeyIcon fontSize='large' color='secondary' />
      </Grid>
      <Grid item xs={11}>
        <CustomField 
          fullWidth
          variant='outlined'
          type='password'
          label='Contraseña actual'
          name='password'
          color='secondary'
        />
      </Grid>
      <Grid item xs={1}>
        <FiberNewIcon fontSize='large' color='secondary' />
      </Grid>
      <Grid item xs={11}>
        <CustomField 
          fullWidth
          variant='outlined'
          type='password'
          label='Nueva contraseña'
          name='newPassword'
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
          type='password'
          label='Confirmación de nueva contraseña'
          name='newPasswordConfirmation'
          color='secondary'
        />
      </Grid>
    </>
  );
};

export default ChangeUsername;