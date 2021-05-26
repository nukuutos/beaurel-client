import React, { useState } from 'react';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import { useSelector, useDispatch } from 'react-redux';
import { changeAppointmentStatus } from '../../../../redux/appointments/actions';
import { setAlert } from '../../../../redux/alert/actions';
import Appointment from '../appointment';
import Modal from '../../../utils/modal';

const OnConfirmationAppointment = ({ appointment }) => {
  const [isConfirmation, setIsConfirmation] = useState(false);
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { _id } = appointment;

  const [asyncAction, isLoading, isCancelled] = useAsyncAction();

  const cancel = async () => {
    const config = {
      method: 'put',
      url: `/master/${profileId}/appointment/${_id}/status/customer`,
      data: {
        status: 'cancelled',
      },
      accessToken,
    };

    const alert = await asyncAction(config);
    if (alert) {
      dispatch(changeAppointmentStatus({ nextStatus: 'cancelled', appointment, user: 'customer' }));
      dispatch(setAlert(alert));
      if (!isCancelled.current) setIsConfirmation(false);
    }
  };

  return (
    <Appointment appointment={appointment}>
      <div className="appointment-card__buttons">
        <div onClick={() => setIsConfirmation(true)} className={`btn btn--primary btn--flat btn--fail`}>
          Отменить
        </div>
      </div>

      {isConfirmation && (
        <Modal onClickClose={() => setIsConfirmation(false)}>
          <div className="appointment-cancellation card">
            <div className="appointment-cancellation__heading heading">Предупреждение</div>
            <p className="appointment-cancellation__text mt-8">Вы действительно хотите отменить запись?</p>

            <div className="appointment-cancellation__buttons mt-8">
              <div
                onClick={() => setIsConfirmation(false)}
                className={`btn  btn--secondary btn--gray ${isLoading ? 'btn--disabled' : ''} mr-4`}>
                Нет
              </div>
              <div
                onClick={async () => await cancel()}
                className={`btn btn--primary btn--fail ${isLoading ? 'btn--disabled btn--spinner' : ''}`}>
                Да
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Appointment>
  );
};

export default OnConfirmationAppointment;
