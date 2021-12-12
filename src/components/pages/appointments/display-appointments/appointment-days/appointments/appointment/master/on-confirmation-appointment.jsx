import Appointment from '../base/appointment';
import useChangeStatus from '../utils/use-change-status';

const OnConfirmationAppointment = ({ appointment }) => {
  const [reject, isRejectionLoading] = useChangeStatus({
    appointment,
    status: 'rejected',
    user: 'master',
  });

  const [confirm, isConfirmationLoading] = useChangeStatus({
    appointment,
    status: 'confirmed',
    user: 'master',
  });

  const disabledClassName = isRejectionLoading || isConfirmationLoading ? 'btn--disabled' : '';

  const loadingRejectionClassName = isRejectionLoading ? 'btn--spinner' : '';
  const loadingConfirmationClassName = isConfirmationLoading ? 'btn--spinner' : '';

  return (
    <Appointment appointment={appointment}>
      <div className="appointment-card__buttons">
        <div
          onClick={confirm}
          className={`btn btn--primary btn--flat mr-4 ${disabledClassName} ${loadingConfirmationClassName}`}
        >
          Подтвердить
        </div>
        <div
          onClick={reject}
          className={`btn btn--secondary btn--flat btn--fail ${disabledClassName} 
          ${loadingRejectionClassName}`}
        >
          Отклонить
        </div>
      </div>
    </Appointment>
  );
};

export default OnConfirmationAppointment;
