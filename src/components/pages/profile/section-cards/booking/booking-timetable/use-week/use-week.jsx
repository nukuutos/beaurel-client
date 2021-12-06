import { useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import Day from './day';

import AutoTimetable from './timetables/auto-timetable';
import ManuallyTimetable from './timetables/manually-timetable';
import Timetable from './timetables/timetable';
import { getDataForUseWeek, getToday } from './utils';

const useWeek = (setStep) => {
  const [timetableState, appointmentsState] = useSelector((state) => [
    state.timetable,
    state.appointments,
  ]);

  // current time by master timezone
  const today = getToday(timetableState.timezone);
  // get first day of a week
  const [startDay, setStartDay] = useState(today.weekday(0));

  const renderWeek = () => {
    const { startDayOfWeek, endDayOfWeek, month, year } = getDataForUseWeek(startDay);
    const weekDays = [];

    for (let i = startDayOfWeek; i <= endDayOfWeek; i++) {
      let timetable = { ...timetableState };

      const date = dayjs(`${year}-${month}-${i}`).utc(true); // 00:00:00Z

      // date >= today => put [] in day component
      if (date.isSameOrBefore(today)) {
        weekDays.push(<Day date={date} setStep={setStep} key={i} />);
        continue;
      }

      timetable = Timetable.getCorrectTimetable(timetable, date);

      const [bookedAppointments, service] = Timetable.getDataFromAppointmentState(
        appointmentsState,
        date
      );

      const weekdayIndex = date.weekday();

      const { sessionTime, type, auto, manually } = timetable;

      let availableAppointments;
      let unavailableAppointments;

      // auto, sessionTime, service, booked appointments, weekdayIndex, weekdays
      if (type === 'auto') {
        const { weekends, possibleAppointmentsTime, exceptions } = auto;

        const autoTimetable = new AutoTimetable(
          sessionTime,
          possibleAppointmentsTime,
          weekends,
          exceptions
        );

        const isWeekend = autoTimetable.checkWeekend(weekdayIndex);

        if (isWeekend) {
          weekDays.push(<Day date={date} setStep={setStep} key={i} />);
          continue;
        }

        autoTimetable
          .filterAppointmentsWithBookedAppointments(bookedAppointments)
          .filterAppointmentsWithExceptions(weekdayIndex);

        if (service) autoTimetable.filterAppointmentsWithService(service);

        [availableAppointments, unavailableAppointments] = autoTimetable.getAppointments();
      }

      if (type === 'manually') {
        const { appointments } = manually;
        const availableAppointmentsForWeekday = appointments[weekdayIndex];

        if (!availableAppointmentsForWeekday.length) {
          weekDays.push(<Day date={date} setStep={setStep} key={i} />);
          continue;
        }

        const manuallyTimetable = new ManuallyTimetable(
          sessionTime,
          availableAppointmentsForWeekday
        );

        manuallyTimetable.filterAppointmentsWithBookedAppointments(bookedAppointments);

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
