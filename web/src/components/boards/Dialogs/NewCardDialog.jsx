import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useQueryClient, useMutation } from 'react-query';
import { Form, Formik } from 'formik';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';

import { Highlight, CustomField } from 'components/common';

import apiClient from 'services/api';
import { newCardSchema } from 'utils/validation/card';

export const NewCardDialog = ({ isOpen, handleClose, listId }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(data => apiClient.post('/cards/new', data), {
    onSuccess: () => {
      queryClient.invalidateQueries('lists');
    }
  });

  const handleSubmit = async (data, { setStatus, resetForm, setSubmitting }) => {
    const cardData = {
      ...data,
      listId,
    };

    try {
      setSubmitting(true);

      const { data: { message } } = await mutation.mutateAsync(cardData);

      setSubmitting(false);

      setStatus({ success: message });
    }
    catch (error) {
      setStatus(error.response ? error.response.data.message : 'Ha ocurrido un error, inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>
          <Highlight>Agrega</Highlight> una nueva tarjeta
        </DialogTitle>
        <Formik 
          initialValues={{ title: '' }} 
          validationSchema={newCardSchema}
          onSubmit={handleSubmit}
        >
          {({ status, isSubmitting }) => (
            <Form>
              <DialogContent>
                <DialogContentText>
                  El cerrar este diálogo hará que{" "}
                  <Highlight>pierdas los cambios</Highlight>.
                </DialogContentText>
                <div>
                  <CustomField
                    type='text'
                    name='title'
                    label='Título'
                    color='secondary'
                    fullWidth
                  />
                </div>
                <br />

                {status &&
                  (status.success ? (
                    <Typography variant='body1' color='secondary'>
                      {status.success}
                    </Typography>
                  ) : (
                    <Typography variant='body1' color='error'>
                      {status}
                    </Typography>
                  ))}
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose} color='secondary'>
                  {!!status?.success ? 'Cerrar' : 'Cancelar'}
                </Button>
                <Button
                  color='secondary'
                  variant='contained'
                  type='submit'
                  disabled={isSubmitting || !!status?.success}
                  startIcon={
                    <ClipLoader
                      loading={isSubmitting}
                      size={15}
                      color={'#ffffff'}
                    />
                  }
                >
                  Guardar
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};
