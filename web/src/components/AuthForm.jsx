import React from 'react';
import styled from 'styled-components/macro';
import { Form, Formik, useField } from 'formik';
import { 
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
} from '@material-ui/core';
import { useMutation } from 'react-query';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import Highlight from '../components/Highlight';

import apiClient from '../services/api';

import graduated from '../assets/svgs/graduated.svg';
import team from '../assets/svgs/team.svg';

const Background = styled.div`
  background-image: url(${graduated}), url(${team});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 360px;
  background-position: left center, right center;

  position: absolute;
  width: 100%;
  left: 2px;
  height: 90%;
  z-index: -1;
`;

const Container = styled.div`
  padding: 25px;
  margin: 0 auto;
  max-width: ${({ maxWidth }) => maxWidth}px;
  text-align: center;

  button {
    margin-top: 20px;
    margin-bottom: 15px;
    padding: 10px 20px;
  }

  h6 {
    margin: 20px 0 10px 0;
  }

  svg {
    margin: 8px 0 0 -8px;
  }
`;

const AuthForm = ({ route, validationSchema, maxWidth = 700 }) => {
  const { mutateAsync } = useMutation(data => apiClient.post(route, data));

  const initialValues = route === 'signin'
    ? { 
      email: '', 
      password: '',
    }
    : { 
      email: '', 
      username: '',
      password: '', 
      passwordConfirmation: '', 
      fullname: '',
    };
  
  const handleSubmit = async (data, { setStatus, resetForm, setSubmitting })  => {
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
    <>
      <Background/>
      <Container maxWidth={maxWidth}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ status, isSubmitting }) => (
            <Form>
              <Typography variant='h4' align='center' gutterBottom>
                {route === 'signin' ? 'Inicia sesión' : 'Registrate' } y empieza a usar <Highlight>Board Hub</Highlight>
              </Typography>

              <Paper elevation={4} style={{ padding: '30px 20px' }}>

                <Grid container alignItems='flex-start' spacing={4}>
                  {route === 'signin' ? <Signin /> : <Signup />}
                </Grid>

                <Button 
                  type='submit' 
                  variant='contained' 
                  color='secondary'
                  disabled={isSubmitting}
                >
                  Enviar
                </Button>

                {status && 
                  <Typography variant='body1' color='error'>
                    {status}
                  </Typography>
                }
              </Paper>
            </Form>
          )}
        </Formik>
        <Typography variant='h6' align='center'>
          Empieza a manejar todo de una <Highlight>mejor forma</Highlight>.
        </Typography>
      </Container>
    </>
  );
};

const Signin = () => {
  return (
    <> 
      <Grid item xs={1}>
        <AccountCircle fontSize='large' color='secondary' />
      </Grid>
      <Grid item xs={11}>
        <CustomTextField 
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
        <CustomTextField 
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

const Signup = () => {
  return (
    <>
      <Grid item xs={6}>
        <CustomTextField 
          fullWidth
          variant='outlined'
          type='email'
          label='Email'
          name='email'
          color='secondary'
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField 
          fullWidth
          variant='outlined'
          type='text'
          label='Nombre de usuario'
          name='username'
          color='secondary'
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField 
          fullWidth
          variant='outlined'
          type='password'
          label='Contraseña'
          name='password'
          color='secondary'
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField 
          fullWidth
          variant='outlined'
          type='password'
          label='Confirmación de contraseña'
          name='passwordConfirmation'
          color='secondary'
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField 
          fullWidth
          variant='outlined'
          type='text'
          label='Nombre Completo'
          name='fullname'
          color='secondary'
        />
      </Grid>
    </>
  );
};

const CustomTextField = (props) => {
  const [field, meta] = useField(props);
  const error = meta.error && meta.touched ? meta.error : '';

  return <TextField {...field} {...props} helperText={error} error={!!error}/>;
};

export default AuthForm;