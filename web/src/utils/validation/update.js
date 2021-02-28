import * as yup from 'yup';

export const updateUsernameSchema = yup.object({
  username: yup.string().required('Este campo es requerido.'),
  usernameConfirmation: yup.string().required('Este campo es requerido.')
    .oneOf([yup.ref('username'), null], 'Los nombres de usuario deben coincidir.'),
});

export const updatePasswordSchema = yup.object({
  password: yup.string().required('Este campo es requerido.'),
  newPassword: yup.string().min(8, 'Mínimo ocho (8) carácteres.').required('Este campo es requerido.'),
  newPasswordConfirmation: yup.string().required('Este campo es requerido.')
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir.'),
});