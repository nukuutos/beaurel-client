import React from 'react';
import { useField, Field } from 'formik';

const Select = ({ className, children, ...props }) => {
  const [field] = useField(props);

  return (
    <Field className={className} {...field} {...props}>
      {children}
    </Field>
  );
};

export default Select;
