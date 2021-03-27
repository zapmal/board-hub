import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';

import { StatusContainer } from './styles';

export const Status = ({ status, loading = false, color = 'secondary' }) => {
  return status === 'loading'
    ? (
      <StatusContainer>
        <HashLoader loading={loading} size={100} color={'#7362d0'} />
      </StatusContainer>
    )
    : (
      <StatusContainer error>
        <Typography variant='h4' color={color} gutterBottom>
          Oh no!
          <br />
          <ErrorIcon fontSize='large' color={color} />
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Parece que ha ocurrido un error.
        </Typography>
        <Typography variant='body2'>
          Revisa tu conexión y luego refresca la página, si el error persiste, contacta con nosotros directamente.
        </Typography>
      </StatusContainer>
    );
};
