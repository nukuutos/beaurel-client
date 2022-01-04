import { ErrorMessage } from 'formik';
import React, { useEffect } from 'react';
import Input from '../../../base/form/input';

const Names = ({ goNext, validateField, errors }) => {
  const isDisabled = errors.firstName || errors.lastName;
  const disabledClassName = isDisabled ? 'btn--disabled' : '';

  useEffect(() => {
    validateField('firstName');
  }, [validateField]);

  const handleClick = () => {
    validateField('firstName');
    validateField('lastName');

    if (errors.firstName || errors.lastName) return;

    goNext();
  };

  return (
    <>
      <h2 className="sign-up__heading">Заполните информацию о себе</h2>

      <div className="sign-up__group">
        <div className="sign-up__group mt-7">
          <label className="label" htmlFor="firstName">
            Имя
          </label>
          <Input className="input sign-up__input" name="firstName" id="firstName" type="text" />
          <ErrorMessage name="firstName">
            {(msg) => <div className="error mt-1">{msg}</div>}
          </ErrorMessage>
        </div>

        <div className="sign-up__group mt-4">
          <label className="label" htmlFor="lastName">
            Фамилия
          </label>
          <Input className="input sign-up__input" name="lastName" id="lastName" type="text" />
          <ErrorMessage name="lastName">
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

export default Names;
