import * as yup from 'yup';

export const newCardSchema = yup.object({
  title: yup.string().required('Este campo es requerido.'),
});
