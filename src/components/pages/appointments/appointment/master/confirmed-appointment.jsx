import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useAsyncAction from '../../../../../hooks/use-async-action/use-async-action';
import { changeAppointmentStatus } from '../../../../../redux/appointments/actions';
import { setAlert } from '../../../../../redux/alert/actions';
import Appointment from '../appointment';

const ConfimedAppointment = ({ appointment }) => {
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { _id } = appointment;

  const [asyncActionCancelled, isCancelledLoading] = useAsyncAction();

  const cancel = async () => {
    const config = {
      method: 'put',
      url: `/master/${profileId}/appointment/${_id}/status/master`,
      data: {
        status: 'rejected',
      },
      accessToken,
    };

    const alert = await asyncActionCancelled(config);

    if (alert) {
      dispatch(changeAppointmentStatus({ nextStatus: 'rejected', appointment, user: 'master' }));
      dispatch(setAlert(alert));
    }
  };

  return (
    <Appointment appointment={appointment}>
      <div className="appointment-card__buttons">
        <div
          onClick={() => cancel()}
          className={`btn btn--primary btn--flat btn--fail ${
            isCancelledLoading ? 'btn--disabled btn--spinner' : ''
          }`}
        >
          Отменить
        </div>
      </div>
    </Appointment>
  );
};

export default ConfimedAppointment;
