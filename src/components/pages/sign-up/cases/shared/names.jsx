import Link from 'next/link';
import React, { useEffect } from 'react';
import ErrorInput from '../../../../base/form/error-input';

const Names = ({ goToNextStep, validateField, errors }) => {
  const isDisabled = errors.firstName || errors.lastName;
  const disabledClassName = isDisabled ? 'btn--disabled' : '';

  useEffect(() => {
    validateField('firstName');
  }, [validateField]);

  const handleClick = () => {
    validateField('firstName');
    validateField('lastName');

    if (errors.firstName || errors.lastName) return;

    goToNextStep();
  };

  return (
    <>
      <h2 className="sign-up__heading">Заполните информацию о себе</h2>

      <div className="sign-up__group">
        <ErrorInput className="sign-up__group mt-7" name="firstName" label="Имя" />
        <ErrorInput className="sign-up__group mt-4" name="lastName" label="Фамилия" />
        <button
          onClick={handleClick}
          type="button"
          className={`btn btn--primary ${disabledClassName} sign-up__btn mt-6`}
        >
          Продолжить
        </button>
      </div>

      <span className="sign-up__disclaimer">
        Данное приложение работает в ДЕМО целях, и не позволяет зарегистрироваться пользователями, а
        также отправлять их персональные данные на обработку! Все пользователи веб-приложения
        вымышлены, и используются для демонстрации работы веб-приложения, любые совпадения случайны.
      </span>
    </>
  );
};

export default Names;
