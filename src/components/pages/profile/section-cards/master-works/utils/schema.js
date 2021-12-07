import * as Yup from 'yup';

const titleField = Yup.string()
  .trim()
  .min(2, 'Минимальная длина - 2 символа!')
  .max(30, 'Максимальная длина - 30 символов!')
  .required('Необходимо заполнить!');

const workSchema = Yup.object().shape({
  title: titleField,
});

export default workSchema;
