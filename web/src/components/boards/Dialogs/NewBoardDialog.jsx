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
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import { CustomField, Highlight } from 'components/common';

import apiClient from 'services/api';

import newBoardSchema from 'utils/validation/newBoard';

export const NewBoardDialog = ({ isOpen, handleClose }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(data => apiClient.post('/b/new', data), {
    onSuccess: () => {
      queryClient.invalidateQueries('boards');
      queryClient.invalidateQueries('favoriteBoards');
    }
  });
  
  const handleSubmit = async (data, { setStatus, resetForm, setSubmitting }) => {
    try {
      setSubmitting(true);

      const { data: { message } } = await mutation.mutateAsync(data);

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
        <DialogTitle><Highlight>Agrega</Highlight> un nuevo tablero</DialogTitle>
        <Formik
          initialValues={{ name: '', description: '', isFavorite: false }}
          validationSchema={newBoardSchema}
          onSubmit={handleSubmit}
        >
          {({ status, isSubmitting }) => (
            <Form>
              <DialogContent>
                <DialogContentText>
                  El cerrar este diálogo hará que <Highlight>pierdas los cambios</Highlight>.
                </DialogContentText>
                <div>
                  <CustomField 
                    type='text'
                    name='name'
                    label='Nombre'
                    color='secondary'
                  />
                </div>
                <br/>
                <div>
                  <CustomField 
                    type='text'
                    name='description'
                    label='Descripción'
                    color='secondary'
                    fullWidth
                  />
                </div>
                <br/>
                <div>
                  <Typography variant='subtitle2' component='span'>
                    ¿Agregar a <Highlight>Favoritos</Highlight>?
                  </Typography>
                  <CustomField
                    type='checkbox'
                    style={{ marginBottom: '2px' }}
                    icon={<StarBorderIcon />}
                    checkedIcon={<StarIcon />}
                    name='isFavorite'
                  />
                </div>

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
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose} color='secondary'>
                  {!!status?.success ? 'Cerrar' : 'Cancelar'}
                </Button>
                <Button 
                  color='secondary' 
                  variant='contained' 
                  type='submit'
                  disabled={isSubmitting || (!!status?.success)}
                  startIcon={<ClipLoader loading={isSubmitting} size={15} color={'#ffffff'} />}
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