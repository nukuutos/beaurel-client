import { useSelector } from 'react-redux';
import ModalHeading from '../../../../../../../../../../base/modal/modal-heading';
import UpdateServiceDuration from './update-service-duration/update-service-duration';
import UpdateSubServiceDuration from './update-sub-service-duration/update-sub-service-duration';
import useGetDataForUpdate from './use-get-data-for-update';

const UpdateDuration = ({ setStep, onClickClose }) => {
  const [service, { isPhone }] = useSelector((state) => [
    state.appointments.booking.bookingAppointment.service,
    state.screenSize,
  ]);

  const isServiceParameter = service?.parameter;

  useGetDataForUpdate();

  return (
    <div className={`add-service ${isPhone ? '' : 'card'}`}>
      <ModalHeading
        titleDesktopClassName="add-service__heading"
        title="Изменить длительность"
        onClickClose={onClickClose}
      />

      {isServiceParameter ? (
        <UpdateSubServiceDuration setStep={setStep} />
      ) : (
        <UpdateServiceDuration setStep={setStep} />
      )}
    </div>
  );
};

export default UpdateDuration;
