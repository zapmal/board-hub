import React, { memo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

import Highlight from './Highlight';

const ConfirmationDialog = memo(({ isOpen, handleClose}) => {
  return (
    <Dialog
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle>¿Estás seguro de que lo quieres <Highlight>borrar</Highlight>?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Una vez borrado, no habrá forma de recuperarlo. 
            <br />
            El borrado es <Highlight>permanente</Highlight>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Rechazar
          </Button>
          <Button onClick={handleClose} color='secondary' autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
  );
});

export default ConfirmationDialog;