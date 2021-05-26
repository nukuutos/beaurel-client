import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import Select from '../../form/select';
import renderDurationOptions from '../utils/render-duration-options';
import displayDuration from '../utils/display-duration';

const UpdateService = ({ index, values, initialValues }) => {
  // const [{ sessionTime }, { accessToken, id: profileId }] = useSelector((state) => [state.timetable, state.auth]);
  const { duration: initialDuration } = initialValues.services[index];
  const { title, duration, price, id } = values.services[index];

  const sessionTime = 240;

  console.log(duration % sessionTime !== 0, duration, sessionTime);

  return (
    <div className={`service service-update service-update--${duration % sessionTime !== 0 ? 'fail' : 'success'} mt-6`}>
      <div className={`service__side service__side--left`}>
        <span className="label">Название</span>
        <span className="service__title">{title}</span>
      </div>

      <div className="service__side service__side--right edit-service__side">
        <div
          className={`edit-service__input input--icon input--${
            duration % sessionTime !== 0 ? 'error' : 'success'
          } ml-4`}>
          <FontAwesomeIcon className="input__icon" icon="clock" />
          {/* value={values.duration} name */}
          <Select value={duration} className="input" name={`services.${index}.duration`} as="select">
            <option className="input__hide">{displayDuration(initialDuration)}</option>
            {renderDurationOptions(sessionTime)}
          </Select>
        </div>

        <span className={`service__price service__group mt-5 ml-8`}>
          <FontAwesomeIcon icon="ruble-sign" />
          {price}
        </span>
      </div>
    </div>
  );
};

export default UpdateService;
