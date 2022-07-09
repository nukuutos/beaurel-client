import Link from 'next/link';
import React, { useEffect } from 'react';
import ErrorInput from '../../../../base/form/error-input';

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

      <span className="sign-up__agreement">
        Нажимая «Продолжить», вы принимаете следующие{' '}
        <span className="sign-up__agreement-rules">
          <Link prefetch={false} href="/agreement">
            <a>условия пользования</a>
          </Link>
        </span>
      </span>
    </>
  );
};

export default Names;
