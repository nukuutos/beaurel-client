import * as Yup from 'yup';

export const titleField = Yup.string()
  .trim()
  .min(2, 'Minimum length is 2 characters')
  .max(30, 'Maximum length is 30 characters')
  .required('Field is required'); // wth???

export const workSchema = Yup.object().shape({
  title: titleField,
  // file?
});
