import * as Yup from 'yup';

export const firstName = Yup.string()
  .trim()
  .required('Обязательно к заполнению!')
  .min(2, 'Минимальная длина - 2 символа!')
  .max(30, 'Максимальная длина - 20 символов!')
  .matches(/^[а-яё]+/i, 'Только русские буквы!');

export const lastName = Yup.string()
  .trim()
  .required('Обязательно к заполнению!')
  .min(2, 'Минимальная длина - 2 символа!')
  .max(30, 'Максимальная длина - 20 символов!')
  .matches(/^[а-яё]+/i, 'Только русские буквы!');

export const password = Yup.string()
  .trim()
  .required('Обязательно к заполнению!')
  .min(6, 'Минимальная длина - 6 символов!');

export const confirmedPassword = Yup.string().test(
  'Совпадение паролей',
  'Пароли не совпадают!',
  function (value) {
    return this.parent.password === value;
  }
);

export const specialization = Yup.string().required('Обязательно к заполнению!');

export const phone = Yup.string()
  .required('Обязательно к заполнению!')
  .length(10, 'Неправильный номер телефона!')
  .matches(/^[0-9]+/i, 'Неправильный номер телефона!');

export const masterSchema = Yup.object().shape({
  firstName,
  lastName,
  password,
  confirmedPassword,
  phone,
  specialization,
});

export const customerSchema = Yup.object().shape({
  firstName,
  lastName,
  password,
  confirmedPassword,
  phone,
});
