import { useState } from 'react';
import Appointment from '../../base/appointment';
import useChangeStatus from '../../utils/use-change-status';
import UpdateAppointment from './update-appointment/update-appointment';

const UnsuitableAppointment = ({ appointment }) => {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [cancel, isLoading] = useChangeStatus({ appointment, status: 'rejected', user: 'master' });

  const isDisabledClassName = isLoading ? 'btn--disabled' : '';
  const isLoadingClassName = isLoading ? 'btn--spinner' : '';

  const openModal = () => setIsUpdateModal(true);
  const closeModal = () => setIsUpdateModal(false);

  return (
    <Appointment appointment={appointment}>
      <div className="appointment-card__buttons">
        <div
          onClick={openModal}
          className={`btn btn--primary btn--flat mr-4 ${isDisabledClassName}`}
        >
          Изменить
        </div>
        <div
          onClick={cancel}
          className={`btn btn--secondary btn--flat btn--fail ${isDisabledClassName} ${isLoadingClassName}`}
        >
          Отклонить
        </div>
      </div>
      {isUpdateModal && <UpdateAppointment appointment={appointment} onClickClose={closeModal} />}
    </Appointment>
  );
};

export default UnsuitableAppointment;
