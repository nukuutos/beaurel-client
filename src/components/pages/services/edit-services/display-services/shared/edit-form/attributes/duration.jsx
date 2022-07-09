import React from 'react';
import Select from '../../../../../../../base/form/select';
import Time from '../../../../../../../base/icons/time.';
import DurationOptions from '../../../../../duration-options/duration-options';

const Duration = ({ values }) => (
  <div className="edit-service__input input--icon ml-4">
    <Time className="input__icon" />
    <Select value={values.duration} className="input" name="duration" as="select">
      <DurationOptions />
    </Select>
  </div>
);

export default Duration;
