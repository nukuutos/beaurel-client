import * as Yup from 'yup';

const nameField = Yup.string()
  .trim()
  .matches(/^[ёа-я-]+$/i)
  .min(2, 'Максимальная длина - 2 символа!')
  .max(20, 'Максимальная длина - 20 символов!')
  .required('Обязательно к заполнению!');

export const firstNameSchema = Yup.object().shape({
  firstName: nameField,
});

export const lastNameSchema = Yup.object().shape({
  lastName: nameField,
});
