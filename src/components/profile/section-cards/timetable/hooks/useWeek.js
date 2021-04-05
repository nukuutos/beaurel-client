import React, { useState } from 'react';
import { getStartDateOfWeek, getWeekDayRU } from '../utils/week';
import { useSelector } from 'react-redux';
import convertDateToString from '../utils/convert-date-to-string';
import { getAvailableAppointmentsTime } from '../utils/get-available-appointments-time';
import disable from '../../utils/disable';
import Day from '../day';
import filterAppointmentsForSevice from '../../utils/filter-appointments-for-sevice';

const useWeek = (setStep) => {
  const today = new Date();
  // startDate, setStartDay
  const [startDay, setStartDay] = useState(getStartDateOfWeek(today)); // get first day of a week and work with it

  let [timetable, appointmentsState] = useSelector((state) => [state.timetable, state.appointments]);

  const renderWeek = () => {
    const month = startDay.getMonth();
    const year = startDay.getFullYear();

    const startDayOfWeek = startDay.getDate() + 1; // num
    const endDayOfWeek = startDayOfWeek + 6; // num

    const weekDays = []; // result

    for (let i = startDayOfWeek; i <= endDayOfWeek; i++) {
      const date = new Date(Date.UTC(year, month, i, 0, 0, 0, 0));
      const stringDate = convertDateToString(date);

      // today > date => put [] in day component
      if (today.getTime() >= date.getTime()) {
        weekDays.push(<Day date={date} setStep={setStep} key={i} />);
        continue;
      }

      const { update } = timetable;

      // update && updateDate <= date
      if (update && new Date(update.date).getTime() <= date.getTime()) timetable = timetable.update;

      const { sessionTime, type, auto, manually } = timetable;

      const { masterAppointments } = appointmentsState.booking; // appointments from appointmentsState
      const bookedAppointments = masterAppointments[stringDate] || []; // get booked appointments from server for this date
      const weekdayIndexRU = getWeekDayRU(date.getDay());

      let availableAppointments = [];
      let unavailableAppointments = [];

      if (type === 'auto') {
        const { weekends, possibleAppointmentsTime, exceptions } = auto;

        // check is it weekend
        if (weekends.includes(weekdayIndexRU)) {
          weekDays.push(<Day date={date} setStep={setStep} key={i} />);
          continue;
        }

        // filter appointmetns with booked appointments
        availableAppointments = getAvailableAppointmentsTime(bookedAppointments, possibleAppointmentsTime, sessionTime);

        // exceptions
        // filter appointmetns with exceptions
        const dayExceptions = exceptions[weekdayIndexRU];
        const exceptionsLength = dayExceptions.length;

        if (exceptionsLength) {
          for (let i = 0; i < exceptionsLength; i++) {
            const exceptionTime = dayExceptions[i];
            const startIndex = availableAppointments.indexOf(exceptionTime);
            availableAppointments.splice(startIndex, 1);
          }
        }

        // check for service
        const {
          bookingAppointment: { service },
        } = appointmentsState.booking;

        // if we choose service (if this component is step 2), we find suitable apps for this service
        if (service) {
          const { duration } = service;

          availableAppointments = availableAppointments.filter(
            (time) => !disable(time, availableAppointments, sessionTime, duration)
          );
        }
      }
      // }

      if (type === 'manually') {
        const { appointments } = manually;
        availableAppointments = appointments[weekdayIndexRU];

        if (!availableAppointments.length) {
          weekDays.push(<Day date={date} setStep={setStep} key={i} />);
          continue;
        }

        // filter possible times by compare booking times with possible times for this date
        const bookedAppointmentsCount = bookedAppointments.length;

        for (let i = 0; i < bookedAppointmentsCount; i++) {
          const bookedTime = bookedAppointments[i];
          const { startAt, endAt } = bookedTime;

          availableAppointments = availableAppointments.filter((time) => {
            if (time < startAt || endAt <= time) return true;
            unavailableAppointments.push(time); // for service case
          });
        }

        const {
          bookingAppointment: { service },
        } = appointmentsState;

        // check this
        if (service) {
          const { duration } = service;

          availableAppointments = availableAppointments.filter((time) =>
            filterAppointmentsForSevice(time, duration, unavailableAppointments)
          );
        }
      }

      weekDays.push(
        <Day
          date={date}
          availableAppointments={availableAppointments}
          unavailableAppointments={unavailableAppointments}
          setStep={setStep}
          key={i}
        />
      );
    }

    return weekDays;
  };

  return [renderWeek(), setStartDay];
};

export default useWeek;
