import React from 'react';
import { useField } from 'formik';

export const Textarea = ({ className, maxLength = null, ...props }) => {
  const [field, meta] = useField(props);
  const errorClass = meta.error && meta.touched ? ' input--error' : '';
  // const successClass = meta.touched && !meta.error ? ' form__success' : '';

  className += errorClass;
  // className += successClass;

  return <textarea className={className} maxLength={maxLength} {...props} {...field} />;
};

export default Textarea;
