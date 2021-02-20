import React from 'react';
import { useField } from 'formik';
import { Checkbox, TextField } from '@material-ui/core';

const CustomField = (props) => {
  const [field, meta] = useField(props);
  const error = meta.error && meta.touched ? meta.error : '';

  if (props.type === 'checkbox') {
    return <Checkbox {...field} {...props} />;
  }

  return <TextField {...field} {...props} helperText={error} error={!!error}/>;
};

export default CustomField;