import React from 'react';
import { useSelector } from 'react-redux';
import Day from './day/day';
import { getDataForUseWeek } from './utils';
import Timetable from './timetables/timetable';
import useTimeFrame from './use-time-frame';
import getAddEmptyDay from './utils/get-add-empty-day';
import handleAutoCase from './utils/handle-cases/handle-auto-case';
import handleManuallyCase from './utils/handle-cases/handle-manually-case';
import handleTimeFrame from './utils/handle-cases/handle-time-frame';
import { getIsWithinTimeFrame } from './utils/time-frame';

const useWeek = ({ step, startDayData, getHandleClickOnDay, service }) => {
  const [timetableState, appointmentsState] = useSelector((state) => [
    state.timetable,
    state.appointments,
  ]);

  const { today, startDay } = startDayData;

  const { startDayOfWeek, endDayOfWeek, month, year } = getDataForUseWeek(startDay);

  const timeFrame = useTimeFrame(service);

  const weekDays = [];

  for (let i = startDayOfWeek; i <= endDayOfWeek; i++) {
    const date = Timetable.getDate({ month, year, day: i }); // 00:00:00Z
    const addEmptyDay = getAddEmptyDay({ weekDays, date, getHandleClickOnDay });

    const isWithinTimeFrame = getIsWithinTimeFrame({ ...timeFrame, date, step });
    let data = handleTimeFrame({ addEmptyDay, date, today, isWithinTimeFrame });
    if (data.isContinue) continue;

    const timetable = Timetable.getCorrectTimetable(timetableState, date);
    const bookedAppointments = Timetable.getDataFromAppointmentState(appointmentsState, date);
    const dataForCases = {
      addEmptyDay,
      date,
      timetable,
      dataForBooking: { bookedAppointments, service },
    };

    if (timetable.type === 'auto') {
      data = handleAutoCase(dataForCases);
    }

    if (timetable.type === 'manually') {
      data = handleManuallyCase(dataForCases);
    }

    const { isContinue, appointments } = data;

    if (isContinue) continue;

    weekDays.push(
      <Day {...appointments} date={date} getHandleClickOnDay={getHandleClickOnDay} key={i} />
    );
  }

  return weekDays;
};

export default useWeek;
