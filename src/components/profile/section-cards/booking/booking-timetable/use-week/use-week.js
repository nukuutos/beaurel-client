import React, { useState } from "react";
import { useSelector } from "react-redux";

import Day from "../day";

import { getStartDateOfWeek, getWeekDayRU } from "../utils/week";
import convertDateToString from "../utils/convert-date-to-string";
import AutoTimetable from "./auto-timetable";
import ManuallyTimetable from "./manually-timetable";
// import { getUpdateDate, getDate } from "./utils";
import { getDateUTC, getToday, getTommorow, getUpdateDate } from "../booking-phone-timetable/utils";

const useWeek = (setStep) => {
  let [timetableState, appointmentsState] = useSelector((state) => [state.timetable, state.appointments]);

  // today by master tz
  // const today = getToday(timetableState.timezone);
  const today = getToday(timetableState.timezone);

  // get first day of a week and work with it
  // const [startDay, setStartDay] = useState(getStartDateOfWeek(today));
  // const [startDay, setStartDay] = useState(getToday(timetableState.timezone).weekday(0));
  const [startDay, setStartDay] = useState(getToday(timetableState.timezone).weekday(0));

  // console.log(getToday(timetableState.timezone));

  const renderWeek = () => {
    // const month = startDay.getMonth();
    const month = startDay.month() + 1;

    // const year = startDay.getFullYear();
    const year = startDay.year();

    // const startDayOfWeek = startDay.getDate() + 1; // num
    const startDayOfWeek = startDay.date(); // num
    // const endDayOfWeek = startDayOfWeek + 6; // num
    const endDayOfWeek = startDayOfWeek + 6; // num

    const weekDays = []; // result, components

    for (let i = startDayOfWeek; i <= endDayOfWeek; i++) {
      let timetable = { ...timetableState };

      // const date = getDate(year, month, i); // new method
      const date = getDateUTC(`${year}-${month}-${i}`); // new method

      // console.log(date.format());

      // const stringDate = convertDateToString(date);
      const stringDate = date.format("DD-MM-YYYY");

      // today > date => put [] in day component
      // if (today.getTime() >= date.getTime()) {
      if (!today.isBefore(date)) {
        weekDays.push(<Day date={date} setStep={setStep} key={i} />);
        continue;
      }

      const { update } = timetable;

      // const updateDate = getUpdateDate(update);
      const updateDate = getUpdateDate(update); // another method

      // if (updateDate && updateDate.getTime() <= date.getTime()) timetable = timetable.update;
      if (updateDate && !updateDate.isAfter(date)) timetable = timetable.update;

      const { sessionTime, type, auto, manually } = timetable;

      const { bookedAppointments: bookedAppointmentsState } = appointmentsState.booking; // appointments from appointmentsState
      const bookedAppointments = bookedAppointmentsState[stringDate] || []; // get booked appointments from server for this date
      // const weekdayIndexRU = getWeekDayRU(date.getDay());
      const weekdayIndexRU = date.weekday();

      let availableAppointments, unavailableAppointments;

      if (type === "auto") {
        const { weekends, possibleAppointmentsTime, exceptions } = auto;

        const autoTimetable = new AutoTimetable(sessionTime, possibleAppointmentsTime, weekends, exceptions);

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

      if (type === "manually") {
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
