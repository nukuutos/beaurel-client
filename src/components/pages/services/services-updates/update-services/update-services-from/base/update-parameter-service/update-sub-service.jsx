import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSelector } from 'react-redux';
import Select from '../../../../../../../base/form/select';
import displayDuration from '../../../../../utils/display-duration';
import getInputClassName from '../get-input-class-name';
import useDurationOptions from '../../../../../hooks/use-duration-options/use-duration-options';

const UpdateSubService = ({ subService, initialDuration, fieldName, isLast }) => {
  const { parameter, duration, price } = subService;
  const { sessionTime } = useSelector((state) => state.timetable.update);
  const durationOptions = useDurationOptions({ isUpdate: true });

  const lastClassName = isLast ? 'service-parameter-update__sub-service--last' : '';
  const inputClassName = getInputClassName(duration, sessionTime);
  const displayInitialDuration = displayDuration(initialDuration);

  return (
    <div
      className={`service service-parameter service-parameter-update__sub-service ${lastClassName}`}
    >
      <span className="service__side service__side--left">
        <span className="label">Параметр</span>
        <span className="service__title service-parameter__parameter">{parameter}</span>
      </span>

      <div className="service__side service__side--right edit-service__side">
        <div className={`edit-service__input input--icon ${inputClassName} ml-4`}>
          <FontAwesomeIcon className="input__icon" icon="clock" />
          <Select value={duration} className="input" name={fieldName} as="select">
            <option className="input__hide">{displayInitialDuration}</option>
            {durationOptions}
          </Select>
        </div>

        <span className="service__group mt-5 ml-8">
          <FontAwesomeIcon icon="ruble-sign" />
          {price}
        </span>
      </div>
    </div>
  );
};

export default UpdateSubService;
