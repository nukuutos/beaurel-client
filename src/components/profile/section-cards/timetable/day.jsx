import Appointment from './appointment';
import { useDispatch } from 'react-redux';
import { setAppointmentDate } from '../../../../redux/appointments/actions';
import { MONTHS, DAYS_OF_THE_WEEK } from './utils/week';
import displayDuration from '../services/utils/display-duration';

const Day = ({ setStep, date, availableAppointments = [] }) => {
  const dispatch = useDispatch();

  const formatedAvailableTimes = availableAppointments.map((time) => displayDuration(time));

  return (
    <div className="day">
      <div className="day__header">
        {DAYS_OF_THE_WEEK[date.getDay()]}
        <br />
        <div className="day__subheader">
          {date.getDate()} {MONTHS[date.getMonth()]}
        </div>
      </div>

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
              return { ...state, isTimetable: false, isResult: true, step: state.step + 1, lastStepName: 'timetable' };
            });
            dispatch(setAppointmentDate({ date, time: timeData[i], availableAppointments }));
          }}
          key={i}
          time={time}
        />
      ))}
    </div>
  );
};

export default Day;
