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
import ClipLoader from 'react-spinners/ClipLoader';

import Highlight from 'components/Highlight';
import { Background, FormContainer } from './styles';

import apiClient from 'services/api';
import useUserStore from 'stores/useUserStore';

const AuthForm = ({ 
  route, 
  validationSchema, 
  history, 
  maxWidth = 700,
  children
}) => {
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
                  {children}
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

export default withRouter(AuthForm);
