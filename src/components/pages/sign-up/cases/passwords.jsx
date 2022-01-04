import { ErrorMessage } from 'formik';
import React, { useEffect } from 'react';
import Input from '../../../base/form/input';

const Passwords = ({ goNext, errors, validateField }) => {
  const isDisabled = errors.password || errors.confirmedPassword;
  const disabledClassName = isDisabled ? 'btn--disabled' : '';

  useEffect(() => {
    validateField('password');
  }, [validateField]);

  const handleClick = () => {
    validateField('password');
    validateField('confirmedPassword');

    if (errors.password || errors.confirmedPassword) return;

    goNext();
  };

  return (
    <>
      <h2 className="sign-up__heading">Придумайте и подтвердите пароль</h2>

      <div className="sign-up__group">
        <div className="sign-up__group mt-7">
          <label className="label" htmlFor="password">
            Пароль
          </label>
          <Input className="input sign-up__input" name="password" id="password" type="password" />
          <ErrorMessage name="password">
            {(msg) => <div className="error mt-1">{msg}</div>}
          </ErrorMessage>
        </div>

        <div className="sign-up__group mt-4">
          <label className="label" htmlFor="confirmedPassword">
            Подтвердите пароль
          </label>
          <Input
            className="input sign-up__input"
            name="confirmedPassword"
            id="confirmedPassword"
            type="password"
          />
          <ErrorMessage name="confirmedPassword">
            {(msg) => <div className="error mt-1">{msg}</div>}
          </ErrorMessage>
        </div>

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
