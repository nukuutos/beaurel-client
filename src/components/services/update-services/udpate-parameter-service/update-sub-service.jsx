import React from 'react';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { subServiceSchema } from '../../utils/schemas';
import { updateSubServiceSuccess } from '../../../../redux/service/actions/service-parameter';
import { setAlert } from '../../../../redux/alert/actions';
import Spinner from '../../../utils/spinner';
import renderDurationOptions from '../../utils/render-duration-options';
import Textarea from '../../../form/textarea';
import Select from '../../../form/select';
import InputIcon from '../../../form/input-icon';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import displayDuration from '../../utils/display-duration';

const UpdateSubService = ({ subService, initialDuration, fieldName, isLast }) => {
  const dispatch = useDispatch();
  const { parameter, duration, price, id } = subService;
  // const [{ sessionTime }, { accessToken, id: profileId }] = useSelector((state) => [state.timetable, state.auth]);
  const [asyncAction, isLoading] = useAsyncAction();

  const sessionTime = 240;

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
