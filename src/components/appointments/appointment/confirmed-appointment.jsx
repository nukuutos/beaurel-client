import React from 'react';
import useAsyncAction from '../../../hooks/useAsyncAction';
import { useSelector, useDispatch } from 'react-redux';
import { changeAppointmentStatus } from '../../../redux/appointments/actions';
import { setAlert } from '../../../redux/alert/actions';
import Appointment from './appointment';

const ConfimedAppointment = ({ appointment }) => {
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { _id } = appointment;

  const [asyncActionCancelled, isCancelledLoading] = useAsyncAction();

  const cancel = async () => {
    const config = {
      method: 'put',
      url: `/profile/${profileId}/appointment/${_id}/status`,
      data: {
        status: 'cancelled',
      },
      accessToken,
    };

    const alert = await asyncActionCancelled(config);

    if (alert) {
      dispatch(changeAppointmentStatus({ nextStatus: 'cancelled', appointment }));
      setAlert(alert);
    }
  };

  return (
    <Appointment appointment={appointment}>
      <div className="appointment-card__buttons">
        <div
          onClick={() => cancel()}
          className={`btn btn--flat btn--fail ${isCancelledLoading ? 'btn--disabled btn--spinner' : ''}`}>
          Отменить
        </div>
      </div>
    </Appointment>
  );
};

export default ConfimedAppointment;
