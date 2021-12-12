import { useSelector, useDispatch } from 'react-redux';
import Appointment from '../base/appointment';
import useChangeStatus from '../utils/use-change-status';

const UnsuitableAppointment = ({ appointment }) => {
  const [cancel, isLoading] = useChangeStatus({ appointment, status: 'rejected', user: 'master' });

  const isDisabledClassName = isLoading ? 'btn--disabled' : '';
  const isLoadingClassName = isLoading ? 'btn--spinner' : '';

  return (
    <Appointment appointment={appointment}>
      <div className="appointment-card__buttons">
        <div onClick={null} className={`btn btn--primary btn--flat mr-4 ${isDisabledClassName}`}>
          Изменить
        </div>
        <div
          onClick={cancel}
          className={`btn btn--secondary btn--flat btn--fail ${isDisabledClassName} ${isLoadingClassName}`}
        >
          Отклонить
        </div>
      </div>
    </Appointment>
  );
};

export default UnsuitableAppointment;
