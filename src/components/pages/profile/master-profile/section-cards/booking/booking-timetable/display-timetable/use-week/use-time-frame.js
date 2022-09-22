import { useSelector } from 'react-redux';

const useTimeFrame = (service) => {
  const { update } = useSelector((state) => state.timetable);

  if (!update) return { fromDate: false, untilDate: false };
  if (service?.isAfterUpdate) return { fromDate: update.date, untilDate: false };
  if (!service?.isAfterUpdate) return { fromDate: false, untilDate: update.date };
  return { fromDate: false, untilDate: false };
};

export default useTimeFrame;
