import React from 'react';
import { useQueryClient, useMutation } from 'react-query';

import { Highlight, CustomField } from 'components/common';
import BaseDialog from '../BaseDialog';

import apiClient from 'services/api';
import { newCardSchema } from 'utils/validation/card';

export const NewCardDialog = ({ isOpen, handleClose, listId }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation((data) => apiClient.post('/cards/new', data), {
    onSuccess: () => {
      queryClient.invalidateQueries('lists');
    },
  });

  const dialogTitle = (
    <span>
      <Highlight>Agrega</Highlight> una nueva carta
    </span>
  );
  const dialogInformation = (
    <span>
      El cerrar este diálogo hará que{' '}
      <Highlight>pierdas los cambios.</Highlight>
    </span>
  );

  const handleSubmit = async (data, { setStatus, resetForm, setSubmitting }) => {
    const cardData = {
      ...data,
      listId,
    };

    try {
      setSubmitting(true);

      const {
        data: { message },
      } = await mutation.mutateAsync(cardData);

      setSubmitting(false);

      setStatus({ success: message });
    } catch (error) {
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
      initialValues={{ title: '' }}
      validationSchema={newCardSchema}
      handleSubmit={handleSubmit}
    >
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
    </BaseDialog>
  );
};
