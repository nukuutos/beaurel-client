import { useDispatch } from 'react-redux';
import { setAppointmentDate } from '../../../../../../../redux/appointments/actions';
import { MONTHS, DAYS_OF_THE_WEEK } from '../utils/week';
import displayDuration from '../../../services/utils/display-duration';
import Appointment from './appointment';

// date is without timezone offset!!!
const Day = ({ setStep, date, availableAppointments = [], unavailableAppointments = [] }) => {
  const dispatch = useDispatch();

  const formatedAvailableTimes = availableAppointments.map((time) => displayDuration(time));

  const toServices = (state) => ({
    ...state,
    isTimetable: false,
    isService: true,
    step: state.step + 1,
    lastStepName: 'timetable',
  });

  const toBookingResult = (state) => ({
    ...state,
    isTimetable: false,
    isResult: true,
    step: state.step + 1,
    lastStepName: 'timetable',
  });

  const handleClick = (availabaleTimeIndex) => () => {
    setStep((state) => {
      if (state.step === 1) return toServices(state);
      return toBookingResult(state);
    });

    dispatch(
      setAppointmentDate({
        date,
        time: availableAppointments[availabaleTimeIndex],
        availableAppointments,
        unavailableAppointments,
      })
    );
  };

  return (
    <>
      <div className="booking-timetable__weekday">
        <span>{DAYS_OF_THE_WEEK[date.weekday()]}</span>
        <span className="mt-3">
          {date.date()} {MONTHS[date.month()]}
        </span>
      </div>
      <div className="booking-timetable__appointments">
        {formatedAvailableTimes.map((time, i) => (
          <Appointment onClick={handleClick(i)} key={time} time={time} />
        ))}
      </div>
    </>
  );
};

export default Day;
