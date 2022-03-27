import * as Yup from 'yup';

export const street = Yup.string()
  .trim()
  .required('Обязательно к заполнению!')
  .min(2, 'Минимальная длина - 2 символа')
  .max(148, 'Максимальная длина улицы - 148 символов!');

export const house = Yup.string()
  .required('Обязательно к заполнению!')
  .trim()
  .matches(/[1-9][0-9]*([а-яё]|(\/[1-9][0-9]*))?/gi, 'Неправильный номер дома!');

export const floor = Yup.number()
  .required('Обязательно к заполнению!')
  .min(1, 'Минимальный этаж - 1!')
  .max(87, 'Максимальный этаж - 87!');

export const building = Yup.string().trim().max(6, 'Максимальная длина корпуса - 6 символов');

export const roomValue = Yup.string()
  .trim()
  .required('Обязательно к заполнению!')
  .min(2, 'Минимальная длина - 2 символа')
  .max(32, 'Максимальная длина - 32 символа');

export const roomType = Yup.string().oneOf(['cabinet', 'salon', 'apartment']);

export const room = Yup.object().shape({
  type: roomType,
  value: roomValue,
});

const placeOfWorkSchema = Yup.object().shape({
  street,
  house,
  floor,
  building,
  room,
});

export default placeOfWorkSchema;
