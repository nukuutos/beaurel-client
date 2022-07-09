import React, { useEffect } from 'react';
import PhoneStep from '../../../shared/phone-step';

const Phone = ({ submitForm, errors, validateField, touched }) => {
  const isDisabled = errors.phone;
  const disabledClassName = Object.keys(errors).length ? 'btn--disabled' : '';
  const errorClassName = isDisabled && touched.phone ? 'input--error' : '';

  useEffect(() => {
    validateField('phone');
  }, [validateField]);

  const handleClick = () => {
    validateField('phone');

    if (errors.phone) return;

    submitForm();
  };

  return (
    <PhoneStep
      handleClick={handleClick}
      disabledClassName={disabledClassName}
      errorClassName={errorClassName}
    />
  );
};

export default Phone;
