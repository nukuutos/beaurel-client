import displayDuration from '../../../../../../../../utils/display-duration';
import { DAYS_OF_THE_WEEK, MONTHS } from '../../utils/week';
import Appointment from './appointment';

// date is without timezone offset!!!
const Day = ({
  getHandleClickOnDay,
  date,
  availableAppointments = [],
  unavailableAppointments = [],
}) => {
  // const handleClick = useClick(setStep, appointmentData);

  const formattedAvailableTimes = availableAppointments.map((time) => displayDuration(time));
  const isUnavailableDay = !availableAppointments.length;

  const unavailableDayClassName = isUnavailableDay
    ? 'booking-timetable__appointments--unavailable'
    : '';

  return (
    <>
      <div className="booking-timetable__weekday">
        <span>{DAYS_OF_THE_WEEK[date.weekday()]}</span>
        <span className="mt-3">
          {date.date()} {MONTHS[date.month()]}
        </span>
      </div>
      <div className={`booking-timetable__appointments ${unavailableDayClassName}`}>
        {formattedAvailableTimes.map((time, i) => {
          const appointmentData = { date, availableAppointments, unavailableAppointments };
          const handleClick = getHandleClickOnDay({ availableTimeIndex: i, appointmentData });
          return <Appointment onClick={handleClick} key={time} time={time} />;
        })}
      </div>
    </>
  );
};

export default Day;
