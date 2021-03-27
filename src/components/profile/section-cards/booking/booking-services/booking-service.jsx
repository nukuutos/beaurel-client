import { setAppointmentService } from '../../../../../redux/appointments/actions';
import { useSelector, useDispatch } from 'react-redux';
import Service from '../../../../services/service';
import disable from '../../utils/disable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import filterAppointmentsForSevice from '../../utils/filter-appointments-for-sevice';

// service that can be disabled
const BookingService = ({ service, setStep }) => {
  const { title, duration, id } = service;
  const dispatch = useDispatch();
  const [
    { time, availableAppointments, unavailableAppointments, date },
    { sessionTime, type, update },
  ] = useSelector((state) => [state.appointments.bookingAppointment, state.timetable]);

  let currentSessionTime = sessionTime;
  let currentType = type;

  if (update && new Date(update.date).getTime() <= date.getTime()) {
    [currentSessionTime, currentType] = [update.sessionTime, update.type];
  }

  let isDisabled;

  if (currentType == 'auto') {
    // if (update && new Date(update.date).getTime() <= date.getTime()) sessionTimeForService = update.sessionTime;
    // console.log(sessionTimeForService, title);
    isDisabled = time ? disable(time, availableAppointments, currentSessionTime, duration) : false; // for 2 case of wrapper
  } else {
    // rendame filterAppointmentsForSevice
    isDisabled = !filterAppointmentsForSevice(time, duration, unavailableAppointments);
  }

  const handleOnClick = () => {
    dispatch(setAppointmentService({ id, title, duration }));
    setStep((state) => {
      if (state.step === 2)
        return { ...state, isService: false, isResult: true, step: state.step + 1, lastStepName: 'service' }; // first was timetable
      return { ...state, isService: false, isTimetable: true, step: state.step + 1, lastStepName: 'service' }; // first was services
    });
  };

  return (
    <div
      className={`service booking-service ${isDisabled ? 'service--disabled' : ''}`}
      onClick={isDisabled ? null : handleOnClick}>
      <Service service={service} />

      <div className="booking-service__arrow">
        <FontAwesomeIcon icon="chevron-right" />
      </div>
    </div>
  );
};

export default BookingService;
