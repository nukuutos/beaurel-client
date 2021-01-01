import React from 'react';
import { useField, Field } from 'formik';

export const InputSelectCustom = ({ className, children, ...props }) => {
  // i don't understand how to do it with useField
  const [field, meta] = useField(props);
  // console.log(props);

  const errorClass = meta.error && meta.touched ? ' form__input--error' : '';
  const successClass = meta.touched && !meta.error ? ' form__input--success' : '';

  className += errorClass;
  className += successClass;

  return (
    <Field className={className} {...field} {...props}>
      {children}
    </Field>
  );
};

export default InputSelectCustom;
