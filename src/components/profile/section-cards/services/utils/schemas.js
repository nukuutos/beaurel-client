import * as Yup from "yup";

export const titleField = Yup.string()
  .trim()
  .min(2, "Максимальная длиня - 2 символа!")
  .max(30, "Максимальная длина - 30 сиволов!")
  .required("Необходимо заполнить!");

export const durationField = (sessionTime) =>
  Yup.number()
    .positive("Длительность не может быть отрицательной!")
    .integer("Длительность - целое число!")
    .max(700, "Длительность не может быть больше 8 часов!")
    .test("duration", "Длительность не кратно длительности сеанса!", (duration) => {
      return duration % sessionTime === 0;
    })
    .required("Необходимо заполнить!");

export const priceField = Yup.number()
  .positive("Цена не может быть негативной!")
  .integer("Цена - целое число!")
  .max(100000, "Слишком большая цена!")
  .required("Необходимо заполнить!");

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
  Yup.object().shape({ title: titleField, subServices: Yup.array().of(subServiceSchema(sessionTime)) });

export default serviceSchema;
