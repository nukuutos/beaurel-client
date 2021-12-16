import React from 'react';
import { useField } from 'formik';

// type="radio" name="same at the whole groud" value="One"

const RadioButton = ({ className, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={`radio-button ${className}`}>
      <input className="radio-button__input" type="radio" {...field} {...props} />
      <label className="radio-button__label" />
    </div>
  );
};

export default RadioButton;
