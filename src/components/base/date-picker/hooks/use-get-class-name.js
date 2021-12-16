import { useSelector } from 'react-redux';
import { getToday } from '../../../../utils/dayjs';

const useGetClassName = ({ choice, monthDates }) => {
  const { timezone } = useSelector((state) => state.timetable);

  const handleClassName = (date) => {
    const [firstDate, lastDate] = monthDates;

    const isNextMonth = date.isAfter(lastDate);
    const isPrevMonth = date.isBefore(firstDate);
    const isActiveDate = date.isSame(choice, 'date');

    const today = getToday(timezone).utc(true);

    if (date.isSameOrBefore(today)) {
      return 'date-picker__date--unavailable date-picker__date--disabled';
    }
    if (isNextMonth || isPrevMonth) return 'date-picker__date--unavailable';
    if (isActiveDate) return 'date-picker__date--active';
    return '';
  };

  return handleClassName;
};

export default useGetClassName;
