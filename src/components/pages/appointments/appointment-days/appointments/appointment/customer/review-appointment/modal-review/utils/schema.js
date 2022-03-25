import * as Yup from 'yup';

const commentField = Yup.string()
  .trim()
  .min(3, 'Минимальная длина - 3 символа!')
  .max(500, 'Максимальная длина - 500 символов!')
  .required('Не заполнено!');

const valueField = Yup.number()
  .min(3, 'Минимальная оценка - 1!')
  .max(500, 'Максимальная оценка - 5!')
  .required('Не заполнено!');

const reviewSchema = Yup.object().shape({
  value: valueField,
  comment: commentField,
});

export default reviewSchema;
