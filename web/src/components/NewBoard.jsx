import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
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

import CustomField from './CustomField';
import Highlight from './Highlight';

import useUserStore from '../stores/useUserStore';

import newBoardSchema from '../libs/validation/newBoard';

const NewBoard = ({ isOpen, handleClose }) => {
  const id = useUserStore(state => state.user.id);
  
  const handleSubmit = (data, { setStatus, resetForm, setSubmitting }) => {
    try {
      setSubmitting(true);

      setTimeout(() => {

        const datav2lmao = {
          ...data,
          userID: id,
        };

        console.log(datav2lmao);

        setSubmitting(false);
      }, 1000);
    }
    catch (error) {
      setStatus(error.response ? error.response.data.message : 'Error.');
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle><Highlight>Agrega</Highlight> un nuevo tablero</DialogTitle>
        <Formik
          initialValues={{ name: '', description: '', isFavorite: '' }}
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

                {status && 
                  <Typography variant='body1' color='error'>
                    {status}
                  </Typography>
                }
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose} color='secondary'>
                  Cancelar
                </Button>
                <Button 
                  color='secondary' 
                  variant='contained' 
                  type='submit'
                  disabled={isSubmitting}
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

export default NewBoard;