import { useEffect, useRef } from 'react';

const useFindFirstAppointment = ({ day, toNextDay, weekdayIndex }) => {
  const isStartFound = useRef(false);

  useEffect(() => {
    const areAppointmentsOnThisDay = day.props.availableAppointments;

    if (!areAppointmentsOnThisDay && !isStartFound.current) {
      toNextDay();
    } else {
      isStartFound.current = true;
    }
  }, [toNextDay, day.props.availableAppointments, weekdayIndex]);
};

export default useFindFirstAppointment;
