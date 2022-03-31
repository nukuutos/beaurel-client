import * as Yup from 'yup';

const usernameField = Yup.string()
  .trim()
  .required('Обязательно к заполнению!')
  .min(3, 'Минимальная длина - 3 символа!')
  .max(20, 'Максимальная длина - 20 символов!')
  .matches(/^[a-z_.]+$/i, 'Некорректный username!');

const usernameSchema = Yup.object().shape({
  username: usernameField,
});

export default usernameSchema;
