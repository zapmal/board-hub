import Typography from '@material-ui/core/Typography';
import { useQueryClient, useMutation } from 'react-query';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import BaseDialog from '../BaseDialog';
import { CustomField, Highlight } from 'components/common';

import apiClient from 'services/api';
import { newBoardSchema } from 'utils/validation/board';

export const NewBoardDialog = ({ isOpen, handleClose }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation((data) => apiClient.post('/b/new', data), {
    onSuccess: () => {
      queryClient.invalidateQueries('boards');
      queryClient.invalidateQueries('favoriteBoards');
    },
  });

  const dialogTitle = (
    <span>
      <Highlight>Agrega</Highlight> un nuevo tablero
    </span>
  );
  const dialogInformation = (
    <span>
      El cerrar este diálogo hará que <Highlight>pierdas los cambios</Highlight>.
    </span>
  );

  const handleSubmit = async (data, { setStatus, resetForm, setSubmitting }) => {
    try {
      setSubmitting(true);

      const {
        data: { message },
      } = await mutation.mutateAsync(data);

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
      initialValues={{ name: '', description: '', isFavorite: false }}
      validationSchema={newBoardSchema}
      handleSubmit={handleSubmit}
    >
      <div>
        <CustomField type='text' name='name' label='Nombre' color='secondary' />
      </div>
      <br />
      <div>
        <CustomField
          type='text'
          name='description'
          label='Descripción'
          color='secondary'
          fullWidth
        />
      </div>
      <br />
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
    </BaseDialog>
  );
};
