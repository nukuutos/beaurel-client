import React from 'react';
import InputIcon from '../../../../../../../../../../base/form/input-icon';
import Ruble from '../../../../../../../../../../base/icons/ruble';

const Price = () => (
  <div className="add-service__price add-service__price--disabled">
    <label className="label " htmlFor="price">
      Цена
    </label>
    <InputIcon
      disabled
      type="number"
      name="price"
      inputClassName="input ml-1"
      wrapperClassName="input--icon input--mini"
    >
      <Ruble className="input__icon input__icon--m" />
    </InputIcon>
  </div>
);

export default Price;
