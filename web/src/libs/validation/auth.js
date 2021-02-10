import * as yup from 'yup';

export const signupSchema = yup.object({
  email: yup.string().email().required('Este campo es requerido.'),
  username: yup.string().required('Este campo es requerido.'),
  password: yup.string().min(8, 'Mínimo ocho (8) carácteres.').required('Este campo es requerido.'),
  passwordConfirmation: yup.string().required('Este campo es requerido.')
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir.'),
  fullname: yup.string().required('Este campo es requerido.'),
});

export const signinSchema = yup.object({
  email: yup.string().email().required('Este campo es requerido.'),
  password: yup.string().min(8, 'Mínimo ocho (8) carácteres.').required('Este campo es requerido.'),
});