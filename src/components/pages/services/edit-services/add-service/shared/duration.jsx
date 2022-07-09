import React from 'react';
import Select from '../../../../../base/form/select';
import Time from '../../../../../base/icons/time.';
import DurationOptions from '../../../duration-options/duration-options';

const Duration = ({ className, name, inputClassName, value }) => (
  <div className={className}>
    <label className="label" htmlFor={name}>
      Длительность
    </label>
    <div className={inputClassName}>
      <Time className="input__icon input__icon--m" />
      <Select value={value} className="input" name={name} as="select">
        <DurationOptions />
      </Select>
    </div>
  </div>
  //
);

export default Duration;
