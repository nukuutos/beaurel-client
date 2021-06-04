import { setAppointmentService } from '../../../../../redux/appointments/actions';
import { useSelector, useDispatch } from 'react-redux';
import Service from '../../../../services/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getIsDisabled from './utils/get-is-disabled';
import getCorrectService from './utils/get-correct-service';

// service that can be disabled
const BookingService = ({ service, setStep, today }) => {
  const [{ bookingAppointment }, timetable] = useSelector((state) => [state.appointments.booking, state.timetable]);

  const dispatch = useDispatch();

  const { title, duration, id } = service;

  // same:
  // state.step === 2 ? getIsDisabled(bookingAppointment, service, timetable) : false
  const isDisabled = getIsDisabled(bookingAppointment, service, timetable);

  const handleOnClick = () => {
    dispatch(setAppointmentService({ id, title, duration }));
    setStep((state) => {
      if (state.step === 2) {
        // first was timetable
        return { ...state, isService: false, isResult: true, step: state.step + 1, lastStepName: 'service' };
      }

      // first was services
      return { ...state, isService: false, isTimetable: true, step: state.step + 1, lastStepName: 'service' };
    });
  };

  return (
    <div
      className={`service service--hover booking-service ${isDisabled ? 'booking-service--disabled' : ''} card mt-6`}
      onClick={isDisabled ? null : handleOnClick}>
      <Service service={getCorrectService(service, bookingAppointment.date)} />

      <div className="booking-service__arrow">
        <FontAwesomeIcon icon="chevron-right" />
      </div>
    </div>
  );
};

export default BookingService;
