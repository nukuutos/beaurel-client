import React from 'react';
import InputCustom from '../../../form/input-custom';

const AddingServiceFields = ({ values }) => {
  return (
    <>
      <label className="service__label" htmlFor="service.duration">
        Duration
      </label>
      <InputCustom className="service__input" type="number" name="service.duration" id="service.duration" />
      <label className="service__label" htmlFor="service.price">
        Price
      </label>
      <InputCustom className="service__input" type="text" name="service.price" id="service.price" />
    </>
  );
};

export default AddingServiceFields;
