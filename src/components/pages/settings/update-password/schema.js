import * as Yup from 'yup';

export const newPassword = Yup.string()
  .trim()
  .required('Обязательно к заполнению!')
  .min(6, 'Минимальная длина - 6 символов!');

export const newConfirmedPassword = Yup.string().test(
  'Совпадение паролей',
  'Пароли не совпадают!',
  function (value) {
    return this.parent.newPassword === value;
  }
);

export const updatePasswordSchema = Yup.object().shape({
  newPassword,
  newConfirmedPassword,
});
