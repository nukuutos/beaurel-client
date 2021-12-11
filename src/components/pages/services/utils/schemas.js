import * as Yup from 'yup';

export const titleField = Yup.string()
  .trim()
  .min(2, 'Minimum length is 2 characters')
  .max(30, 'Maximum length is 30 characters')
  .required('Field is required'); // wth???

export const durationField = (sessionTime) =>
  Yup.number()
    .positive('Duration can not be negative')
    .integer('Duration must be an integer')
    .max(700, 'Duration can not be more than 8 hours') // edit
    .test(
      'duration',
      'This duration is not suitable for session time',
      (duration) => duration % sessionTime === 0
    )
    .required('Duration is required');

export const priceField = Yup.number()
  .positive('Duration can not be negative')
  .integer('Duration must be an integer')
  .max(30000, 'Price is too big');

export const serviceSchema = (sessionTime) =>
  Yup.object().shape({
    title: titleField,
    duration: durationField(sessionTime),
    price: priceField,
  });

export const subServiceSchema = (sessionTime) =>
  Yup.object().shape({
    parameter: titleField,
    duration: durationField(sessionTime),
    price: priceField,
  });

export const parameterServiceSchema = (sessionTime) =>
  Yup.object().shape({
    title: titleField,
    subServices: Yup.array().of(subServiceSchema(sessionTime)),
  });

export const parameterServiceTitleSchema = () =>
  Yup.object().shape({
    title: titleField,
  });
