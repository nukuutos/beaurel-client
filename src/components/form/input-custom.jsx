import React from 'react';
import { useField } from 'formik';

export const InputCustom = ({ className, ...props }) => {
  const [field, meta] = useField(props);

  const errorClass = meta.error && meta.touched ? ' form__input--error' : '';
  const successClass = meta.touched && !meta.error ? ' form__input--success' : '';

  className += errorClass;
  className += successClass;

  return <input className={className} {...field} {...props} />;
};

export default InputCustom;
