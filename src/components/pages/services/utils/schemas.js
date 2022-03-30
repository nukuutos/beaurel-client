import * as Yup from 'yup';

export const titleField = Yup.string()
  .trim()
  .min(3, 'Минимальная длина - 3 символа!')
  .max(50, 'Максимальная длина - 50 символов!')
  .required('Не заполнено!');

export const durationField = Yup.number().required('Не заполнено!');

export const priceField = Yup.number()
  .positive('Цена не может быть отрицательной!')
  .integer('Цена - это число!')
  .max(99999, 'Цена не может превышать 99999!')
  .required('Не заполнено!');

export const serviceSchema = Yup.object().shape({
  title: titleField,
  duration: durationField,
  price: priceField,
});

export const subServiceSchema = Yup.object().shape({
  parameter: titleField,
  duration: durationField,
  price: priceField,
});

export const parameterServiceSchema = Yup.object().shape({
  title: titleField,
  subServices: Yup.array().of(subServiceSchema),
});

export const parameterServiceTitleSchema = Yup.object().shape({
  title: titleField,
});

export const invalidDurationField = (sessionTime) =>
  Yup.number()
    .test('duration', 'Неверная длительность!', (duration) => duration % sessionTime === 0)
    .required('Не заполнено!');

export const updateServiceDurationSchema = (sessionTime) =>
  Yup.object().shape({
    duration: invalidDurationField(sessionTime),
  });

export const updateSubServiceDurationSchema = (sessionTime) =>
  Yup.object().shape({
    duration: invalidDurationField(sessionTime),
  });

export const updateServiceSchema = Yup.object().shape({
  title: titleField,
  duration: durationField,
  price: priceField,
  updateDuration: durationField,
});

export const updateSubServiceSchema = Yup.object().shape({
  parameter: titleField,
  duration: durationField,
  price: priceField,
  updateDuration: durationField,
});

export const updateParameterServiceSchema = Yup.object().shape({
  title: titleField,
  subServices: Yup.array().of(updateSubServiceSchema),
});
