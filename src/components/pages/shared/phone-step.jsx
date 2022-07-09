import { ErrorMessage } from 'formik';
import React from 'react';
import Input from '../../base/form/input';

const PhoneStep = ({ errorClassName, handleClick, disabledClassName }) => (
  <>
    <h2 className="sign-up__heading">Введите номер телефона</h2>

    <div className="sign-up__group">
      <div className="sign-up__group mt-7">
        <label className="label" htmlFor="phone">
          Телефон
        </label>
        <div className={`input--icon sign-up__input ${errorClassName}`}>
          <span className="sign-up__phone-number">+7</span>
          <Input className="input sign-up__input--phone" name="phone" id="phone" type="text" />
        </div>
        <ErrorMessage name="phone">{(msg) => <div className="error mt-1">{msg}</div>}</ErrorMessage>
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

export default PhoneStep;
