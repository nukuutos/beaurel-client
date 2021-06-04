import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Day from '../day';

import { getStartDateOfWeek, getWeekDayRU } from '../utils/week';
import convertDateToString from '../utils/convert-date-to-string';
import AutoTimetable from './auto-timetable';
import ManuallyTimetable from './manually-timetable';
import { getUpdateDate, getDate } from './utils';

const useWeek = (setStep) => {
  const today = new Date();

  const [startDay, setStartDay] = useState(getStartDateOfWeek(today)); // get first day of a week and work with it

  let [timetableState, appointmentsState] = useSelector((state) => [state.timetable, state.appointments]);

  const renderWeek = () => {
    const month = startDay.getMonth();
    const year = startDay.getFullYear();

    const startDayOfWeek = startDay.getDate() + 1; // num
    const endDayOfWeek = startDayOfWeek + 6; // num

    const weekDays = []; // result, components

    for (let i = startDayOfWeek; i <= endDayOfWeek; i++) {
      let timetable = { ...timetableState };

      const date = getDate(year, month, i);

      const stringDate = convertDateToString(date);

      // today > date => put [] in day component
      if (today.getTime() >= date.getTime()) {
        weekDays.push(<Day date={date} setStep={setStep} key={i} />);
        continue;
      }

      const { update } = timetable;

      const updateDate = getUpdateDate(update);

      if (updateDate && updateDate.getTime() <= date.getTime()) timetable = timetable.update;

      const { sessionTime, type, auto, manually } = timetable;

      const { bookedAppointments: bookedAppointmentsState } = appointmentsState.booking; // appointments from appointmentsState
      const bookedAppointments = bookedAppointmentsState[stringDate] || []; // get booked appointments from server for this date
      const weekdayIndexRU = getWeekDayRU(date.getDay());

      let availableAppointments, unavailableAppointments;

      if (type === 'auto') {
        const { weekends, possibleAppointmentsTime, exceptions } = auto;

        const autoTimetable = new AutoTimetable(sessionTime, possibleAppointmentsTime, weekends, exceptions);

        console.log(autoTimetable);

        const isWeekend = autoTimetable.checkWeekend(weekdayIndexRU);

        if (isWeekend) {
          weekDays.push(<Day date={date} setStep={setStep} key={i} />);
          continue;
        }

        autoTimetable.filterAppointmentsWithBookedAppointments(bookedAppointments);

        autoTimetable.filterAppointmentsWithExceptions(weekdayIndexRU);

        const { service } = appointmentsState.booking.bookingAppointment;

        if (service) autoTimetable.filterAppointmentsWithService(service);

        [availableAppointments, unavailableAppointments] = autoTimetable.getAppointments();
      }

      if (type === 'manually') {
        const { appointments } = manually;
        const availableAppointmentsForWeekday = appointments[weekdayIndexRU];

        if (!availableAppointmentsForWeekday.length) {
          weekDays.push(<Day date={date} setStep={setStep} key={i} />);
          continue;
        }

        const manuallyTimetable = new ManuallyTimetable(sessionTime, availableAppointmentsForWeekday);

        manuallyTimetable.filterAppointmentsWithBookedAppointments(bookedAppointments);

        const { service } = appointmentsState.booking.bookingAppointment;

        if (service) manuallyTimetable.filterAppointmentsWithService(service);

        [availableAppointments, unavailableAppointments] = manuallyTimetable.getAppointments();
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
