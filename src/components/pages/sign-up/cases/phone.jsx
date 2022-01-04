import { ErrorMessage } from 'formik';
import React, { useEffect } from 'react';
import Input from '../../../base/form/input';

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
    <>
      <h2 className="sign-up__heading">Подтвердите ваш номер телефона</h2>

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
          type="submit"
          className={`btn btn--primary ${disabledClassName} sign-up__btn mt-6`}
        >
          Получить код
        </button>
      </div>
    </>
  );
};

export default Phone;
