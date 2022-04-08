import * as Yup from 'yup';

const message = Yup.string().trim().required('Обязательно к заполнению!');

const schema = Yup.object().shape({
  message,
});

export default schema;
