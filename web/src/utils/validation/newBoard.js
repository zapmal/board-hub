import * as yup from 'yup';

const newBoardSchema = yup.object({
  name: yup.string().required('Este campo es requerido.'),
  description: yup.string().required('Este campo es requerido.'),
});

export default newBoardSchema;