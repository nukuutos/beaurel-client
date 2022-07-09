import React from 'react';
import InputIcon from '../../../../../../../base/form/input-icon';
import Ruble from '../../../../../../../base/icons/ruble';

const Price = () => (
  <InputIcon
    type="number"
    name="price"
    inputClassName="input ml-2"
    wrapperClassName="input--icon edit-service__input ml-4"
  >
    <Ruble className="input__icon" />
  </InputIcon>
);

export default Price;
