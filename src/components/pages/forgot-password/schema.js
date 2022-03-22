import * as Yup from 'yup';

const number = Yup.string().trim().required('Обязательно к заполнению!');

const code = Yup.object().shape({
  first: number,
  second: number,
  third: number,
  fourth: number,
});

const phone = Yup.string()
  .required('Обязательно к заполнению!')
  .length(10, 'Неправильный номер телефона!')
  .matches(/^[0-9]+/i, 'Неправильный номер телефона!');

const newPassword = Yup.string()
  .trim()
  .required('Обязательно к заполнению!')
  .min(6, 'Минимальная длина - 6 символов!');

const newConfirmedPassword = Yup.string().test(
  'Совпадение паролей',
  'Пароли не совпадают!',
  function (value) {
    return this.parent.newPassword === value;
  }
);

const schema = Yup.object().shape({
  code,
  phone,
  newPassword,
  newConfirmedPassword,
});

export default schema;
