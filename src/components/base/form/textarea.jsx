import React from 'react';
import { useField } from 'formik';

const Textarea = ({ className, isErrorClassName = true, maxLength = null, ...props }) => {
  const [field, meta] = useField(props);
  const errorClass = meta.error && meta.touched ? ' input--error' : '';

  if (isErrorClassName) className += errorClass;

  return <textarea className={className} maxLength={maxLength} {...props} {...field} />;
};

export default Textarea;
