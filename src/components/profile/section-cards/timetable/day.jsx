import Appointment from './appointment';
import { useDispatch } from 'react-redux';
import { setAppointmentDate } from '../../../../redux/appointments/actions';
import { MONTHS, DAYS_OF_THE_WEEK, getWeekDayRU } from './utils/week';
import displayDuration from '../services/utils/display-duration';

const Day = ({ setStep, date, availableAppointments = [], unavailableAppointments = [] }) => {
  const dispatch = useDispatch();

  const formatedAvailableTimes = availableAppointments.map((time) => displayDuration(time));
  return (
    <>
      <div className="booking-timetable__weekday">
        <span>{DAYS_OF_THE_WEEK[getWeekDayRU(date.getDay())]}</span>
        <span className="mt-3">
          {date.getDate()} {MONTHS[date.getMonth()]}
        </span>
      </div>
      <div className="booking-timetable__appointments">
        {formatedAvailableTimes.map((time, i) => (
          <Appointment
            onClick={() => {
              setStep((state) => {
                if (state.step === 1)
                  return {
                    ...state,
                    isTimetable: false,
                    isService: true,
                    step: state.step + 1,
                    lastStepName: 'timetable',
                  };
                return {
                  ...state,
                  isTimetable: false,
                  isResult: true,
                  step: state.step + 1,
                  lastStepName: 'timetable',
                };
              });

              dispatch(
                setAppointmentDate({
                  date,
                  time: availableAppointments[i],
                  availableAppointments,
                  unavailableAppointments,
                })
              );
            }}
            key={i}
            time={time}
          />
        ))}
      </div>
    </>
  );
};

export default Day;
