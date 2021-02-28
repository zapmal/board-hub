import React from 'react';
import { Form, Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import { 
  Grid,
  Typography,
  Paper,
  Button,
} from '@material-ui/core';
import { useMutation } from 'react-query';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ClipLoader from 'react-spinners/ClipLoader';

import Highlight from 'components/Highlight';
import CustomField from 'components/CustomField';
import { Background, FormContainer } from './styles';

import apiClient from 'services/api';
import useUserStore from 'stores/useUserStore';

const AuthForm = ({ route, validationSchema, history, maxWidth = 700 }) => {
  const mutation = useMutation(data => apiClient.post(route, data));
  const setUser = useUserStore(state => state.setUser);

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

      const { data: { token } } = await mutation.mutateAsync(data);

      setSubmitting(false);

      resetForm();

      localStorage.setItem('token', token);
      history.push('/');
      setUser();
    }
    catch (error) {
      setStatus(error.response ? error.response.data.message : 'Ha ocurrido un error, inténtalo de nuevo.');
    }
  };
  
  return (
    <>
      <Background/>
      <FormContainer maxWidth={maxWidth}>
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
                  startIcon={<ClipLoader loading={isSubmitting} size={15} color={'#ffffff'} />}
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
      </FormContainer>
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

const Signup = () => {
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

export default withRouter(AuthForm);