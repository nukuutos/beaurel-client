import { useSelector } from 'react-redux';
import ModalHeading from '../../../../../../../../../base/modal/modal-heading';
import UpdateServices from './update-services/update-services';
import useGetDataForUpdate from './use-get-data-for-update';

const UpdateDuration = ({ setStep, onClickClose }) => {
  const { isPhone } = useSelector((state) => [
    state.appointments.booking.bookingAppointment.service,
    state.screenSize,
  ]);

  useGetDataForUpdate();

  return (
    <div className={`add-service ${isPhone ? '' : 'card'}`}>
      <ModalHeading
        titleDesktopClassName="add-service__heading"
        title="Изменить длительность"
        onClickClose={onClickClose}
      />

      <UpdateServices setStep={setStep} />
    </div>
  );
};

export default UpdateDuration;
