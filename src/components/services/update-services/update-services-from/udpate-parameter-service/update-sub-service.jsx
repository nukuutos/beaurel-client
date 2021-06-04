import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import renderDurationOptions from '../../../utils/render-duration-options';
import Select from '../../../../form/select';
import displayDuration from '../../../utils/display-duration';

const UpdateSubService = ({ subService, initialDuration, fieldName, isLast }) => {
  const { parameter, duration, price, id } = subService;
  const [{ sessionTime }] = useSelector((state) => [state.timetable.update]);

  return (
    <div
      className={`service service-parameter service-parameter-update__sub-service service-parameter-update__sub-service--${
        duration % sessionTime !== 0 ? 'fail' : 'success'
      } ${isLast ? 'service-parameter-update__sub-service--last' : ''}`}>
      <span className="service__side service__side--left">
        <span className="label">Параметр</span>
        <span className={'service__title service-parameter__parameter'}>{parameter}</span>
      </span>

      <div className="service__side service__side--right edit-service__side">
        <div
          className={`edit-service__input input--icon input--${
            duration % sessionTime !== 0 ? 'error' : 'success'
          } ml-4`}>
          <FontAwesomeIcon className="input__icon" icon="clock" />
          <Select value={duration} className="input" name={fieldName} as="select">
            <option className="input__hide">{displayDuration(initialDuration)}</option>
            {renderDurationOptions(sessionTime)}
          </Select>
        </div>

        <span className={'service__group mt-5 ml-8'}>
          <FontAwesomeIcon icon="ruble-sign" />
          {price}
        </span>
      </div>
    </div>
  );
};

export default UpdateSubService;
