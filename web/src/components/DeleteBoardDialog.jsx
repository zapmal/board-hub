import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from '@material-ui/core';
import { useMutation, useQueryClient } from 'react-query';
import { Form, Formik } from 'formik';

import Highlight from './Highlight';

import apiClient from '../services/api';

const DeleteBoardDialog = ({ isOpen, handleClose, boardId }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(({ id }) => apiClient.delete(`/b/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('boards');
      queryClient.invalidateQueries('favoriteBoards');
    }
  });

  console.log(isOpen);

  const handleSubmit = async (data, { setStatus, setSubmitting }) => {
    try {
      setSubmitting(true);

      await mutation.mutateAsync({ id: boardId });

      setSubmitting(false);

      handleClose();
    }
    catch (error) {
      setStatus(error.response ? error.response.data.message : 'Ha ocurrido un error, inténtalo de nuevo.');
    }
  };

  return (
    <Dialog
        open={isOpen}
        onClose={handleClose}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle>¿Estás seguro de que lo quieres <Highlight>borrar</Highlight>?</DialogTitle>
        <Formik initialValues={{}} onSubmit={handleSubmit}>
          {({ status, isSubmitting }) => (
            <Form>
            <DialogContent>
              <DialogContentText>
                Una vez borrado, no habrá forma de recuperarlo. 
                <br />
                El borrado es <Highlight>permanente</Highlight>.
              </DialogContentText>

              {status && (
                <Typography variant='body1' color='error'>
                  {status}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color='secondary'>
                Rechazar
              </Button>
              <Button 
                type='submit'
                color='secondary' 
                variant='contained'
                disabled={isSubmitting || (!!status)}
                startIcon={<ClipLoader loading={isSubmitting} size={15} color={'#ffffff'}/>} 
                autoFocus
              >
                Aceptar
              </Button>
            </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
  );
};

export default DeleteBoardDialog;