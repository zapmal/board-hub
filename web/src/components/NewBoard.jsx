import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import CustomTextField from './CustomTextField';

const NewBoard = ({ isOpen, handleClose }) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          {/* <CustomTextField
            autoFocus
            margin='dense'
            label='Email Address'
            type='email'
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='secondary'>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewBoard;