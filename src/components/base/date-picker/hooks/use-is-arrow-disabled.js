import { useSelector } from 'react-redux';
import { getToday } from '../../../../utils/dayjs';

const useIsArrowDisabled = (monthDates) => {
  const { timezone } = useSelector((state) => state.timetable);

  const [firstDate] = monthDates;

  const prevMonth = firstDate.subtract(1, 'month').endOf('month');

  const today = getToday(timezone);

  if (prevMonth.isBefore(today)) return true;

  return false;
};

export default useIsArrowDisabled;
