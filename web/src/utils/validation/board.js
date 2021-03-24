import * as yup from 'yup';

export const newBoardSchema = yup.object({
  name: yup.string().required('Este campo es requerido.'),
  description: yup.string().required('Este campo es requerido.'),
});
