import * as Yup from 'yup';

const titleField = Yup.string()
  .trim()
  .min(3, 'Минимальная длина - 3 символа!')
  .max(50, 'Максимальная длина - 50 символов!')
  .required('Необходимо заполнить!');

const workSchema = Yup.object().shape({
  title: titleField,
});

export default workSchema;
