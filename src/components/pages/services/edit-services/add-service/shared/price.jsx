import { ErrorMessage } from 'formik';
import React from 'react';
import InputIcon from '../../../../../base/form/input-icon';
import Ruble from '../../../../../base/icons/ruble';

const Price = ({ name }) => (
  <div className="add-service__price">
    <label className="label " htmlFor={name}>
      Цена
    </label>
    <InputIcon
      type="number"
      name={name}
      inputClassName="input ml-1"
      wrapperClassName="input--icon input--mini"
    >
      <Ruble className="input__icon input__icon--m" />
    </InputIcon>
    <ErrorMessage name={name}>{(msg) => <div className="error mt-1">{msg}</div>}</ErrorMessage>
  </div>
);

export default Price;
