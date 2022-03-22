import { ErrorMessage } from 'formik';
import React, { useEffect } from 'react';
import Input from '../../base/form/input';
import useGetVerificationCode from './use-get-verification-code';

const Phone = ({ goNext, errors, validateField, touched, values }) => {
  const isDisabled = errors.phone;
  const disabledClassName = errors.phone ? 'btn--disabled' : '';
  const errorClassName = isDisabled && touched.phone ? 'input--error' : '';

  const [getVerificationCode, isLoading] = useGetVerificationCode({ phone: values.phone, goNext });

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
      <h2 className="sign-up__heading">Введите номер телефона</h2>

      <div className="sign-up__group">
        <div className="sign-up__group mt-7">
          <label className="label" htmlFor="phone">
            Телефон
          </label>
          <div className={`input--icon sign-up__input ${errorClassName}`}>
            <span className="sign-up__phone-number mr-1">+7</span>
            <Input className="input sign-up__input--phone" name="phone" id="phone" type="text" />
          </div>
          <ErrorMessage name="phone">
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

export default Phone;
