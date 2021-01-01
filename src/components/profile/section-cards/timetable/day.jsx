import ms from 'ms';

import Appointment from './appointment';
import { useDispatch } from 'react-redux';
import { setAppointmentDate } from '../../../../redux/appointments/actions';
import { MONTHS, DAYS_OF_THE_WEEK } from './utils/week';

// const zeroAddition = (time) => {
//   if (time.length < 2) return '0' + time;
//   return time;
// };
// const timeFormat = (ms) => {
//   // Convert to hours:
//   const hours = String(parseInt(ms / 3600000)); // 3600000 ms in 1 hour
//   ms = ms % 3600000; // ms remaining after extracting hours
//   // Extract minutes:
//   const minutes = String(parseInt(ms / 60000)); // 60000 ms 1 minute

//   return zeroAddition(hours) + ':' + zeroAddition(minutes);
// };

// const filterArrays = (array1, array2) => array1.filter((item) => !array2.includes(item));

const Day = ({ setStep, date, day, weekDay, month, year, formatedTimeData, timeData = [] }) => {
  const dispatch = useDispatch();
  // // const [day, setDay] = useState([]);

  // const genDayTimeTable = (startDayTime, endDayTime, sessionLength) => {
  //   const dayTimeTable = [startDayTime];

  //   let timeCounter = startDayTime + sessionLength;
  //   while (timeCounter < endDayTime) {
  //     dayTimeTable.push(timeCounter);
  //     timeCounter += sessionLength;
  //   }
  //   return dayTimeTable;
  // };

  // const user = {
  //   sessionLength: ms('1h') + ms('10m'),
  //   workingDay: { start: ms('9h'), end: ms('17h') },
  // };

  // const data = [ms('9h'), ms('10h') + ms('10m')];

  // useEffect(() => {
  //   const { start, end } = user.workingDay;
  //   const sessionLength = user.sessionLength;
  //   const dayTimeTable = genDayTimeTable(start, end, sessionLength);
  //   const freeTimes = filterArrays(dayTimeTable, data).map((time) => timeFormat(time));
  //   setDay(freeTimes);
  // }, []);

  return (
    <div className="day">
      <div className="day__header">
        {DAYS_OF_THE_WEEK[date.getDay()]}
        <br />
        <div className="day__subheader">
          {date.getDate()} {MONTHS[date.getMonth()]}
        </div>
      </div>

      {formatedTimeData.map((time, i) => (
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
            dispatch(setAppointmentDate({ date, time: timeData[i], availableAppointments: timeData }));
            // add to store booked time (month day year time)
          }}
          key={i}
          time={time}
        />
      ))}
    </div>
  );
};

export default Day;
