import React from 'react';

import { useSelector } from 'react-redux';
import Select from '../../../../../../base/form/select';
import DurationOptions from '../../../../duration-options/duration-options';
import getInputClassName from './get-input-class-name';
import displayDuration from '../../../../../utils/display-duration';
import Time from '../../../../../../base/icons/time.';
import Ruble from '../../../../../../base/icons/ruble';

const UpdateService = ({ index, values, initialValues }) => {
  const { sessionTime } = useSelector((state) => state.timetable.update);

  const { duration: initialDuration } = initialValues.services[index];
  const { title, duration, price } = values.services[index];

  const displayInitialDuration = displayDuration(initialDuration);
  const inputClassName = getInputClassName(duration, sessionTime);

  return (
    <div className="service service-update card mt-6">
      <div className="service__side service__side--left">
        <span className="label">Название</span>
        <span className="service__title">{title}</span>
      </div>

      <div className="service__side service__side--right edit-service__side">
        <div className={`edit-service__input input--icon ${inputClassName} ml-4`}>
          <Time className="input__icon" />
          <Select
            value={duration}
            className="input"
            name={`services.${index}.duration`}
            as="select"
          >
            <option className="input__hide">{displayInitialDuration}</option>
            <DurationOptions isUpdate />
          </Select>
        </div>

        <span className="service__price service__group mt-5 ml-8">
          <Ruble />
          {price}
        </span>
      </div>
    </div>
  );
};

export default UpdateService;
