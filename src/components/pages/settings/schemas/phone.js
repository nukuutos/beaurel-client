import * as Yup from 'yup';

const phoneField = Yup.string()
  .trim()
  .matches(/^(\+7|8)[0-9]{10}$/, 'Некорректный номер телефона!')
  .required('Обязательно к заполнению!');

const phoneSchema = Yup.object().shape({
  firstName: phoneField,
});

export default phoneSchema;
