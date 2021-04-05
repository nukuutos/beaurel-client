import Appointment from '../appointment';
import useAsyncAction from '../../../../hooks/useAsyncAction';
import { useSelector, useDispatch } from 'react-redux';
import { changeAppointmentStatus } from '../../../../redux/appointments/actions';

const UnsuitableAppointment = ({ appointment }) => {
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { _id } = appointment;

  const [asyncActionConfirmation, isConfirmationLoading] = useAsyncAction();
  const [asyncActionRejection, isRejectionLoading] = useAsyncAction();

  const change = async () => {
    const config = {
      method: 'put',
      url: `/profile/${profileId}/appointment/${_id}/status/master`,
      data: {
        status: 'confirmed',
      },
      accessToken,
    };

    const alert = await asyncActionConfirmation(config);

    if (alert) {
      dispatch(changeAppointmentStatus({ nextStatus: 'confirmed', appointment, user: 'master' }));
    }
  };

  const reject = async () => {
    const config = {
      method: 'put',
      url: `/profile/${profileId}/appointment/${_id}/status`,
      data: {
        status: 'rejected',
      },
      accessToken,
    };

    const alert = await asyncActionRejection(config);

    if (alert) {
      dispatch(changeAppointmentStatus({ nextStatus: 'rejected', appointment }));
      setAlert(alert);
    }
  };

  return (
    <Appointment appointment={appointment}>
      <div className="appointment-card__buttons">
        <div
          onClick={() => change()}
          className={`btn btn--primary btn--flat mr-4 ${
            isConfirmationLoading || isRejectionLoading ? 'btn--disabled' : ''
          } ${isConfirmationLoading ? 'btn--spinner' : ''}`}>
          Изменить
        </div>
        <div
          onClick={() => reject()}
          className={`btn btn--flat btn--fail ${isConfirmationLoading || isRejectionLoading ? 'btn--disabled' : ''} 
    ${isRejectionLoading ? 'btn--spinner' : ''}`}>
          Отклонить
        </div>
      </div>
    </Appointment>
  );
};

export default UnsuitableAppointment;
