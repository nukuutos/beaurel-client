import { MONTHS, DAYS_OF_THE_WEEK } from '../utils/week';
import displayDuration from '../../utils/display-duration';
import Appointment from './appointment';
import useClick from './use-click';

// date is without timezone offset!!!
const Day = ({ setStep, date, availableAppointments = [], unavailableAppointments = [] }) => {
  const appointmentData = { date, availableAppointments, unavailableAppointments };

  const [handleClick] = useClick(setStep, appointmentData);

  const formattedAvailableTimes = availableAppointments.map((time) => displayDuration(time));

  return (
    <>
      <div className="booking-timetable__weekday">
        <span>{DAYS_OF_THE_WEEK[date.weekday()]}</span>
        <span className="mt-3">
          {date.date()} {MONTHS[date.month()]}
        </span>
      </div>
      <div className="booking-timetable__appointments">
        {formattedAvailableTimes.map((time, i) => (
          <Appointment onClick={handleClick(i)} key={time} time={time} />
        ))}
      </div>
    </>
  );
};

export default Day;
