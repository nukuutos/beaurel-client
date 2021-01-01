import { setAppointmentService } from '../../../../../redux/appointments/actions';
import { useSelector, useDispatch } from 'react-redux';
import Service from './service';

const computeDisabled = (startAt, availableAppointments, sessionTime, duration) => {
  const endAt = startAt + duration;
  for (let i = startAt; i < endAt; i += sessionTime) {
    if (!availableAppointments.includes(i)) return true;
  }

  return false;
};

// service that can be disabled
const DisabledService = ({ service, setStep }) => {
  const { title, duration, price, id } = service;
  const dispatch = useDispatch();
  const [{ time, availableAppointments }, { sessionTime }] = useSelector((state) => [
    state.appointments.bookingAppointment,
    state.timetable,
  ]);

  // time && isBooking
  const isDisabled = time ? computeDisabled(time, availableAppointments, sessionTime, duration) : false; // for 2 case of wrapper

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
      className={`service ${isDisabled ? 'service--disabled' : ''} mb-s-4`}
      onClick={isDisabled ? null : handleOnClick}>
      <Service service={service} />
    </div>
  );
};

export default DisabledService;
