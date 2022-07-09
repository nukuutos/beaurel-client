import React from 'react';
import { useField, Field } from 'formik';

const Select = ({ className, children, isIconOnValue = true, ...props }) => {
  const [field] = useField(props);

  if (field.value !== '' && !isIconOnValue) className += ' select--no-arrow';

  return (
    <Field className={className} {...field} {...props}>
      {children}
    </Field>
  );
};

export default Select;
