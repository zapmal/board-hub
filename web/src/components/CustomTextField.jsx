import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';

const CustomTextField = (props) => {
  const [field, meta] = useField(props);
  const error = meta.error && meta.touched ? meta.error : '';

  return <TextField {...field} {...props} helperText={error} error={!!error}/>;
};

export default CustomTextField;