import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import BaseDialog from '../BaseDialog';
import { Highlight } from 'components/common';

import apiClient from 'services/api';

export const DeleteBoardDialog = ({ isOpen, handleClose, boardId }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(({ id }) => apiClient.delete(`/b/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('boards');
      queryClient.invalidateQueries('favoriteBoards');
    }
  });

  const dialogTitle = (
    <span>
      ¿Estás seguro de que lo quieres <Highlight>borrar</Highlight>?
    </span>
  );
  const dialogInformation = (
    <span>
      Una vez borrado, no habrá forma de recuperarlo. 
      <br />
      El borrado es <Highlight>permanente</Highlight>.
    </span>
  );

  const handleSubmit = async (data, { setStatus, setSubmitting }) => {
    try {
      setSubmitting(true);

      await mutation.mutateAsync({ id: boardId });

      setSubmitting(false);

      handleClose();
    }
    catch (error) {
      setStatus(
        error.response
          ? error.response.data.message
          : 'Ha ocurrido un error, inténtalo de nuevo.'
      );
    }
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      handleClose={handleClose}
      title={dialogTitle}
      information={dialogInformation}
      initialValues={{}}
      handleSubmit={handleSubmit}
      disableOutsideClick={true}
    />
  );
};
