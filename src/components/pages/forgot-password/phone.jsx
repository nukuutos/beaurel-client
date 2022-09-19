import React, { useEffect } from 'react';
import PhoneStep from '../shared/phone-step';
import useGetVerificationCode from './use-get-verification-code';

const Phone = ({ goToNextStep, errors, validateField, touched, values }) => {
  const isDisabled = errors.phone;
  const disabledClassName = errors.phone ? 'btn--disabled' : '';
  const errorClassName = isDisabled && touched.phone ? 'input--error' : '';

  const [getVerificationCode, isLoading] = useGetVerificationCode({
    phone: values.phone,
    goToNextStep,
  });

  useEffect(() => {
    validateField('phone');
  }, [validateField]);

  const handleClick = () => {
    if (errors.phone) return;
    getVerificationCode();
  };

  return (
    <>
      {isLoading && <div className="spinner-with-background" />}
      <PhoneStep
        handleClick={handleClick}
        disabledClassName={disabledClassName}
        errorClassName={errorClassName}
      />
    </>
  );
};

export default Phone;
