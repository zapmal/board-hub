import ClipLoader from 'react-spinners/ClipLoader';
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
  information,
  initialValues,
  validationSchema,
  handleSubmit,
  disableOutsideClick = false,
  customStyles,
  children
}) => {
  const extraProps = disableOutsideClick 
    ? { disableBackdropClick: true, disableEscapeKeyDown: true } 
    : null;

  return (
    <div>
      <Dialog 
        open={isOpen} 
        onClose={handleClose}
        className={customStyles}
        {...extraProps}
      >
        {title && <DialogTitle>{title}</DialogTitle>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ status, isSubmitting }) => (
            <Form>
              <DialogContent>
                {information && <DialogContentText>{information}</DialogContentText>}
                {children}

                {status && (
                  status?.success 
                    ? (
                    <Typography variant='body1' color='secondary' style={{ textAlign: 'center' }}>
                      {status.success}
                    </Typography>
                    ) 
                  : (
                    <Typography variant='body1' color='error' style={{ textAlign: 'center' }}>
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
                  disabled={isSubmitting || (!!status?.success || !!status)}
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

export default BaseDialog;
