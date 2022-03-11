import { useSelector } from 'react-redux';

const useTimeFrame = () => {
  const [{ update }, { service }] = useSelector((state) => [
    state.timetable,
    state.appointments.booking.bookingAppointment,
  ]);

  // const isStatus = service?.status;

  if (!update) return { fromDate: false, untilDate: false };
  if (service?.isAfterUpdate) return { fromDate: update.date, untilDate: false };
  if (!service?.isAfterUpdate) return { fromDate: false, untilDate: update.date };
  return { fromDate: false, untilDate: false };
};

export default useTimeFrame;
