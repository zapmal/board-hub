import React from 'react';
import { Form, Formik } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";

const BaseDialog = ({ 
  isOpen,
  handleClose,
  title,
  initialValues,
  validationSchema,
  handleSubmit,
  children
}) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ status, isSubmitting }) => ()}
        </Formik>
      </Dialog>
    </div>
  );
};

export default BaseDialog;