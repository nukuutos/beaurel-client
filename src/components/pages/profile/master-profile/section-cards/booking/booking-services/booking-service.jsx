import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Service from '../../../../../services/base/service';
import getIsDisabled from './utils/get-is-disabled';
import getCorrectService from './utils/get-correct-service';
import goTo from './go-to';

// bookingAppointment.date is utc 00:00:00!!!

// service that can be disabled
const BookingService = ({ service, stepState, isAfterUpdate }) => {
  const [{ bookingAppointment }, timetable] = useSelector((state) => [
    state.appointments.booking,
    state.timetable,
  ]);

  const dispatch = useDispatch();

  const [{ step }, setStep] = stepState;

  const { date } = bookingAppointment;

  const bookingService = getCorrectService({ step, service, today: date, isAfterUpdate });

  const isDisabled = getIsDisabled(bookingAppointment, bookingService, timetable);

  const handleOnClick = goTo({ setStep, service: bookingService, dispatch, isAfterUpdate });

  return (
    <div
      className={`service service--hover booking-service ${
        isDisabled ? 'booking-service--disabled' : ''
      } card mt-6`}
      onClick={isDisabled ? null : handleOnClick}
    >
      <Service service={bookingService} />

      <div className="booking-service__arrow">
        <FontAwesomeIcon icon="chevron-right" />
      </div>
    </div>
  );
};

export default BookingService;
