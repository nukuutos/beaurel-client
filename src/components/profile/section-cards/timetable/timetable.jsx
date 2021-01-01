import { useState, useEffect } from 'react';
import { DAYS_OF_THE_WEEK, MONTHS, getStartDayOfWeek, getStartDateOfWeek } from './utils/week';
import Day from './day';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTimetableAndAppointmentsStart } from '../../../../redux/timetable/actions';
import { useSelector, useDispatch } from 'react-redux';
import { searchFreeAppointmentsTime } from './utils/appointment';
import displayDuration from '../services/utils/display-duration';
import disable from '../utils/disable';

const convertStringDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return day + '-' + month + '-' + year;
};

const Timetable = ({ stepState }) => {
  const [
    { sessionTime, weekends, possibleAppointmentsTime },
    {
      appointments,
      bookingAppointment: { service },
    },
  ] = useSelector((state) => [state.timetable, state.appointments]);

  const [{ step }, setStep] = stepState;

  const dispatch = useDispatch();

  const today = new Date();
  const [date, setDate] = useState(getStartDateOfWeek(today));
  const [day, setDay] = useState(date.getDate());
  const [weekDay, setWeekDay] = useState(date.getDay());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  // const [startDay, setStartDay] = useState(getStartDayOfWeek(date, day, weekDay));

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    // setStartDay(getStartDayOfWeek(date, day, weekDay));
  }, [date]);

  useEffect(() => {
    // do some checks?
    dispatch(getTimetableAndAppointmentsStart());
  }, []);

  // we getting data of booking appointments
  // then determine if time is free
  // rendering the week

  const renderWeek = () => {
    const currentDay = today.getDate();
    // const startDayOfWeek = getStartDayOfWeek(date, day, weekDay) + 1; // num
    const startDayOfWeek = date.getDate() + 1; // num
    const endDayOfWeek = startDayOfWeek + 6; // num
    const weekDays = [];

    for (let i = startDayOfWeek; i <= endDayOfWeek; i++) {
      const date = new Date(year, month, i);
      const stringDate = convertStringDate(date);

      const bookedAppointments = appointments[stringDate] || [];
      let availableAppointments = [...possibleAppointmentsTime];

      // check is it weekend || today > date => put [], else go next
      if (weekends.includes(date.getDay()) || today.getTime() > date.getTime()) availableAppointments = [];
      else {
        availableAppointments = searchFreeAppointmentsTime(bookedAppointments, availableAppointments, sessionTime);
        // take possible appoinments time and appointments for certain day
        // take out booked appointments from possible appointments
        // put it in day
      }

      // if we choose service, we find suitable apps for this
      if (service) {
        const { duration } = service;

        availableAppointments = availableAppointments.filter(
          (time) => !disable(time, availableAppointments, sessionTime, duration)
        );
      }

      // rename displayDuration
      const foramtedAvailableAppointments = availableAppointments.map((time) => displayDuration(time));

      // can i transform day year montth to date?
      weekDays.push(
        <Day
          key={i}
          date={date}
          // weekDay={DAYS_OF_THE_WEEK[date.getDay()]}
          // month={MONTHS[date.getMonth()]}
          // day={date.getDate()}
          // year={year}
          formatedTimeData={foramtedAvailableAppointments}
          timeData={availableAppointments}
          setStep={setStep}
        />
      );
    }
    return weekDays;
  };

  // if(first day of a week > last day of a week) month--

  return (
    <main className="timetable">
      <div className="week">
        <div className="week__header">
          {step === 2 && (
            <div className="service__icon service__icon--manage service__icon--back">
              <FontAwesomeIcon
                onClick={() =>
                  setStep((state) => {
                    return { ...state, isService: true, isTimetable: false, step: state.step - 1 };
                  })
                }
                icon="long-arrow-alt-left"
              />
            </div>
          )}
          <div
            onClick={() => {
              setDate(new Date(year, month, day - 7));
            }}
            className={`service__icon service__icon--manage`}>
            <FontAwesomeIcon icon="chevron-left" />
          </div>
          <h3>Расписание</h3>
          <div
            onClick={() => {
              console.log('suka!!!!!', new Date(year, month, day + 7));
              setDate(new Date(year, month, day + 7));
            }}
            className={`service__icon service__icon--manage`}>
            <FontAwesomeIcon icon="chevron-right" />
          </div>
          <span className="week__fraction mr-s-4">1/3</span>
        </div>
        {renderWeek()}
      </div>
    </main>
  );
};

export default Timetable;
