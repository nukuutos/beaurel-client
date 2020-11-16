import React from 'react';
import { useField } from 'formik';

export const TextareaCustom = ({ className, ...props }) => {
  const [field, meta] = useField(props);
  const errorClass = meta.error && meta.touched ? ' form__input--error' : '';
  const successClass = meta.touched && !meta.error ? ' form__input--success' : '';

  className += errorClass;
  className += successClass;

  return <textarea className={className} {...props} {...field} />;
};

export default TextareaCustom;
