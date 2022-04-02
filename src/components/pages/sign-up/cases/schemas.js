import * as Yup from 'yup';

export const firstName = Yup.string()
  .trim()
  .required('Обязательно к заполнению!')
  .min(2, 'Минимальная длина - 2 символа!')
  .max(30, 'Максимальная длина - 20 символов!')
  .matches(/^[а-яё]+$/gi, 'Только русские буквы!');

export const lastName = Yup.string()
  .trim()
  .required('Обязательно к заполнению!')
  .min(2, 'Минимальная длина - 2 символа!')
  .max(30, 'Максимальная длина - 20 символов!')
  .matches(/^[а-яё]+$/gi, 'Только русские буквы!');

export const password = Yup.string()
  .trim()
  .required('Обязательно к заполнению!')
  .min(6, 'Минимальная длина - 6 символов!');

export const confirmedPassword = Yup.string().test(
  'Совпадение паролей',
  'Пароли не совпадают!',
  function (value) {
    return this.parent.password === value;
  }
);

export const specialization = Yup.string().required('Обязательно к заполнению!');

export const phone = Yup.string()
  .required('Обязательно к заполнению!')
  .length(10, 'Неправильный номер телефона!')
  .matches(/^[0-9]+/i, 'Неправильный номер телефона!');

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

// export const cabinetName = Yup.string().when('isActive', {
//   is: true,
//   then: Yup.string()
//     .trim()
//     .required('Обязательно к заполнению!')
//     .max(6, 'Максимальная длина номера кабинета - 6 символов'),
// });

// export const apartmentName = Yup.string().when('isActive', {
//   is: true,
//   then: Yup.string()
//     .trim()
//     .required('Обязательно к заполнению!')
//     .max(6, 'Максимальная длина номера - 6 символов'),
// });

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

// export const cabinet = Yup.object().shape({
//   isActive: Yup.boolean(),
//   name: cabinetName,
// });

// export const salon = Yup.object().shape({
//   isActive: Yup.boolean(),
//   name: salonName,
// });

export const placeOfWork = Yup.object().shape({
  street,
  house,
  floor,
  building,
  room,
});

export const masterSchema = Yup.object().shape({
  firstName,
  lastName,
  password,
  confirmedPassword,
  phone,
  specialization,
  placeOfWork,
});

export const customerSchema = Yup.object().shape({
  firstName,
  lastName,
  password,
  confirmedPassword,
  phone,
});
