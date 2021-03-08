import React from 'react';
import {
  Typography,
  Button,
  Paper,
  Grid,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useMutation } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';

import { Highlight } from 'components/common';
import { Background, FormContainer } from '../Form';

import apiClient from 'services/api';

export const UpdateForm = ({
  route,
  validationSchema,
  maxWidth = 500,
  children
}
) => {
  const mutation = useMutation(data => apiClient.put(`/account/${route}`, data));

  const initialValues = route === 'username'
    ? { 
      username: '', 
      usernameConfirmation: '',
    }
    : { 
      password: '', 
      passwordConfirmation: '', 
    };

  const handleSubmit = async (data, { setStatus, setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);

      const { data: { message } } = await mutation.mutateAsync(data);

      setSubmitting(false);

      resetForm();

      setStatus({ success: message });
    }
    catch (error) {
      console.log(error);
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
                Cambia tu <Highlight>{route === 'username' ? 'nombre de usuario' : 'contraseña'}</Highlight> de forma segura
              </Typography>

              <Paper elevation={4} style={{ padding: '30px 20px' }}>

                <Grid container alignItems='flex-start' spacing={4}>
                  {children}
                </Grid>

                <Button 
                  type='submit' 
                  variant='contained' 
                  color='secondary'
                  disabled={isSubmitting || (!!status?.success)}
                  startIcon={<ClipLoader loading={isSubmitting} size={15} color={'#ffffff'} />}
                >
                  Enviar
                </Button>

                {status && (
                  status.success 
                    ? (
                    <Typography variant='body1' color='secondary'>
                      {status.success}
                    </Typography>
                    ) 
                  : (
                    <Typography variant='body1' color='error'>
                      {status}
                    </Typography>
                  ))}
              </Paper>
            </Form>
          )}
        </Formik>
        <Typography variant='h6' align='center'>
          Tu tranquilidad es nuestra <Highlight>mayor prioridad</Highlight>.
        </Typography>
      </FormContainer>
    </>
  );
};