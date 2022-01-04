import * as Yup from 'yup';

const number = Yup.string().trim().required('Обязательно к заполнению!');

const codeVerificationSchema = Yup.object().shape({
  first: number,
  second: number,
  third: number,
  fourth: number,
});

export default codeVerificationSchema;
