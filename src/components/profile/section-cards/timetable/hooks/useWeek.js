import React, { useState } from 'react';
import { getStartDateOfWeek } from '../utils/week';
import { useSelector } from 'react-redux';
import convertDateToString from '../utils/convert-date-to-string';
import { getAvailableAppointmentsTime } from '../utils/get-available-appointments-time';
import disable from '../../utils/disable';
import Day from '../day';

const useWeek = (setStep) => {
  const today = new Date();

  const [date, setDate] = useState(getStartDateOfWeek(today)); // always get first day of a week and work with it

  const [
    { sessionTime, weekends, possibleAppointmentsTime },
    {
      appointments,
      bookingAppointment: { service },
    },
  ] = useSelector((state) => [state.timetable, state.appointments]);

  const renderWeek = () => {
    const month = date.getMonth();
    const year = date.getFullYear();

    const startDayOfWeek = date.getDate() + 1; // num
    const endDayOfWeek = startDayOfWeek + 6; // num

    const weekDays = [];

    for (let i = startDayOfWeek; i <= endDayOfWeek; i++) {
      const date = new Date(year, month, i);
      const stringDate = convertDateToString(date);

      const bookedAppointments = appointments[stringDate] || []; // get booked appointments from server for this date
      let availableAppointments = [...possibleAppointmentsTime]; // there is every possible appointment time for booking

      // check is it weekend || today > date => put [] in day component , else go next
      if (weekends.includes(date.getDay()) || today.getTime() > date.getTime()) availableAppointments = [];
      else {
        // filter possible times by compare booking times for this date with possible times
        availableAppointments = getAvailableAppointmentsTime(bookedAppointments, availableAppointments, sessionTime);
      }

      // if we choose service (if this component is step 2), we find suitable apps for this service
      if (service) {
        const { duration } = service;

        availableAppointments = availableAppointments.filter(
          (time) => !disable(time, availableAppointments, sessionTime, duration)
        );
      }

      weekDays.push(<Day date={date} availableAppointments={availableAppointments} setStep={setStep} key={i} />);
    }

    return weekDays;
  };

  return [renderWeek(), setDate];
};

export default useWeek;
