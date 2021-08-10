import * as Yup from "yup";

export const titleField = Yup.string()
  .trim()
  .min(2, "Минимальная длина - 2 символа!")
  .max(30, "Максимальная длина - 30 символов!")
  .required("Необходимо заполнить!");

export const workSchema = Yup.object().shape({
  title: titleField,
  // file?
});
