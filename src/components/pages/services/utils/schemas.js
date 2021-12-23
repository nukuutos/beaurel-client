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

export const serviceSchema = (sessionTime, updateSessionTime = null) => {
  const updateDuration = updateSessionTime ? durationField(updateSessionTime) : null;

  return Yup.object().shape({
    title: titleField,
    duration: durationField(sessionTime),
    price: priceField,
    updateDuration,
  });
};

export const subServiceSchema = (sessionTime, updateSessionTime) => {
  const updateDuration = updateSessionTime ? durationField(updateSessionTime) : null;

  return Yup.object().shape({
    parameter: titleField,
    duration: durationField(sessionTime),
    price: priceField,
    updateDuration,
  });
};

export const parameterServiceSchema = (sessionTime, updateSessionTime) =>
  Yup.object().shape({
    title: titleField,
    subServices: Yup.array().of(subServiceSchema(sessionTime, updateSessionTime)),
  });

export const parameterServiceTitleSchema = () =>
  Yup.object().shape({
    title: titleField,
  });
