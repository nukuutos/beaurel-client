import React, { useState } from 'react';
import { getStartDateOfWeek, getWeekDayRU } from '../utils/week';
import { useSelector } from 'react-redux';
import convertDateToString from '../utils/convert-date-to-string';
import { getAvailableAppointmentsTime } from '../utils/get-available-appointments-time';
import disable from '../../utils/disable';
import Day from '../day';

const filterAppointmentsForSevice = (time, duration, unavailableAppointments) => {
  const startAt = time;
  const endAt = startAt + duration;
  const unavailableAppointmentsLength = unavailableAppointments.length;

  if (!unavailableAppointmentsLength) return true;

  for (let i = 0; i < unavailableAppointments.length; i++) {
    const unavailableTime = unavailableAppointments[i];
    if (endAt <= unavailableTime) return true;
    if (startAt <= time && time < endAt) return false;
  }
};

const useWeek = (setStep) => {
  const today = new Date();
  // startDate, setStartDay
  const [startDay, setStartDay] = useState(getStartDateOfWeek(today)); // get first day of a week and work with it

  const [timetable, appointmentsState] = useSelector((state) => [state.timetable, state.appointments]);

  const renderWeek = () => {
    const {
      appointments,
      bookingAppointment: { service }, // if we have already choose an appointment
    } = appointments;

    const month = startDay.getMonth();
    const year = startDay.getFullYear();

    const startDayOfWeek = startDay.getDate() + 1; // num
    const endDayOfWeek = startDayOfWeek + 6; // num

    const weekDays = []; // result

    for (let i = startDayOfWeek; i <= endDayOfWeek; i++) {
      const date = new Date(year, month, i);
      const stringDate = convertDateToString(date);

      // today > date => put [] in day component
      if (today.getTime() >= date.getTime()) {
        weekDays.push(<Day date={date} availableAppointments={[]} setStep={setStep} key={i} />);
        continue;
      }

      const { update } = timetable;

      // update && updateDate <= date
      if (update && new Date(update.date).getTime() <= date.getTime()) timetable = timetable.update;

      const { sessionTime, type, auto, manually } = timetable;

      const { appointments } = appointmentsState; // appointments from appointmentsState
      const bookedAppointments = appointments[stringDate] || []; // get booked appointments from server for this date
      const weekdayIndexRU = getWeekDayRU(date.getDay());

      let availableAppointments = [];

      if (type === 'auto') {
        const { weekends, possibleAppointmentsTime, exceptions } = auto;

        // check is it weekend
        if (weekends.includes(weekdayIndexRU)) {
          weekDays.push(<Day date={date} availableAppointments={[]} setStep={setStep} key={i} />);
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
        } = appointmentsState;

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
          weekDays.push(<Day date={date} availableAppointments={[]} setStep={setStep} key={i} />);
          continue;
        }

        // filter possible times by compare booking times with possible times for this date
        const bookedAppointmentsCount = bookedAppointments.length;
        const unavailableAppointments = [];

        for (let i = 0; i < bookedAppointmentsCount; i++) {
          const bookedTime = bookedAppointments[i];
          const { startAt, endAt } = bookedTime;

          availableAppointments = availableAppointments.filter((time) => {
            if (time < startAt || endAt <= time) return true;
            unavailableAppointments.push(time); // for service case
          });
        }

        // check this
        if (service) {
          const { duration } = service;

          availableAppointments = availableAppointments.filter((time) =>
            filterAppointmentsForSevice(time, duration, unavailableAppointments)
          );
        }
      }
    }

    weekDays.push(<Day date={date} availableAppointments={availableAppointments} setStep={setStep} key={i} />);

    return weekDays;
  };

  // const renderWeek = () => {
  //   const month = date.getMonth();
  //   const year = date.getFullYear();

  //   const startDayOfWeek = date.getDate() + 1; // num
  //   const endDayOfWeek = startDayOfWeek + 6; // num

  //   const weekDays = [];

  //   for (let i = startDayOfWeek; i <= endDayOfWeek; i++) {
  //     const date = new Date(year, month, i);
  //     const stringDate = convertDateToString(date);

  //     const bookedAppointments = appointments[stringDate] || []; // get booked appointments from server for this date
  //     let availableAppointments = [...possibleAppointmentsTime]; // there is every possible appointment time for booking

  //     // check is it weekend || today > date => put [] in day component , else go next
  //     if (weekends.includes(getWeekDayRU(date.getDay())) || today.getTime() > date.getTime())
  //       availableAppointments = [];
  //     else {
  //       // filter possible times by compare booking times with possible times for this date
  //       availableAppointments = getAvailableAppointmentsTime(bookedAppointments, availableAppointments, sessionTime);
  //       // exceptions
  //       const weekDayNum = getWeekDayRU(date.getDay());
  //       console.log(weekDayNum);
  //       const exceptionsForThisDay = exceptions[weekDayNum];
  //       const exceptionLength = exceptionsForThisDay.length;

  //       if (exceptionLength) {
  //         for (let i = 0; i < exceptionLength; i++) {
  //           const exceptionTime = exceptionsForThisDay[i];
  //           const startIndex = availableAppointments.indexOf(exceptionTime);
  //           availableAppointments.splice(startIndex, 1);
  //         }
  //       }

  //       // if we choose service (if this component is step 2), we find suitable apps for this service
  //       if (service) {
  //         const { duration } = service;

  //         availableAppointments = availableAppointments.filter(
  //           (time) => !disable(time, availableAppointments, sessionTime, duration)
  //         );
  //       }
  //     }

  //     if (type === 'manually') {
  //       let availableAppointments = manually.appointments[getWeekDayRU(date.getDay())];

  //       if (!availableAppointments.length || today.getTime() > date.getTime()) {
  //         availableAppointments = [];
  //       } else {
  //         // filter possible times by compare booking times with possible times for this date
  //         const bookedAppointmentsCount = bookedAppointments.length;
  //         const unavailableAppointments = [];

  //         for (let i = 0; i < bookedAppointmentsCount; i++) {
  //           const bookedTime = bookedAppointments[i];
  //           const { startAt, endAt } = bookedTime;

  //           availableAppointments = availableAppointments.filter((time) => {
  //             if (time < startAt || endAt <= time) return true;
  //             unavailableAppointments.push(time);
  //           });
  //         }
  //         // check this
  //         if (service) {
  //           const { duration } = service;

  //           availableAppointments = availableAppointments.filter((time) =>
  //             filterAppointmentsForSevice(time, duration, unavailableAppointments)
  //           );
  //         }
  //       }
  //     }

  //     weekDays.push(<Day date={date} availableAppointments={availableAppointments} setStep={setStep} key={i} />);
  //   }

  //   return weekDays;
  // };

  return [renderWeek(), setStartDay];
};

export default useWeek;
