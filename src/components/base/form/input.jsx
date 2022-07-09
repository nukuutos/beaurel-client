import React from 'react';
import { useField } from 'formik';

const Input = ({ className, ...props }) => {
  const [field, meta] = useField(props);

  const errorClass = meta.error && meta.touched ? ' input--error' : '';
  // const successClass = meta.touched && !meta.error ? ' form__input--success' : '';

  className += errorClass;
  // className += successClass;

  return <input className={className} {...field} {...props} autoComplete="off" />;
};

export default Input;
