import React, { useEffect } from 'react';
import ErrorInput from '../../../../base/form/error-input';

const Passwords = ({ goToNextStep, errors, validateField }) => {
  const isDisabled = errors.password || errors.confirmedPassword;
  const disabledClassName = isDisabled ? 'btn--disabled' : '';

  useEffect(() => {
    validateField('password');
  }, [validateField]);

  const handleClick = () => {
    validateField('password');
    validateField('confirmedPassword');

    if (errors.password || errors.confirmedPassword) return;

    goToNextStep();
  };

  return (
    <>
      <h2 className="sign-up__heading">Придумайте и подтвердите пароль</h2>

      <div className="sign-up__group">
        <ErrorInput
          className="sign-up__group mt-7"
          name="password"
          label="Пароль"
          type="password"
        />

        <ErrorInput
          className="sign-up__group mt-4"
          name="confirmedPassword"
          label="Подтвердите пароль"
          type="password"
        />

        <button
          onClick={handleClick}
          type="button"
          className={`btn btn--primary ${disabledClassName} sign-up__btn mt-6`}
        >
          Продолжить
        </button>
      </div>
    </>
  );
};

export default Passwords;
