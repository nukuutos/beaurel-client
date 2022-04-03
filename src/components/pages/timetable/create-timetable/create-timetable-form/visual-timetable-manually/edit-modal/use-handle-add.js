import { useDispatch } from 'react-redux';
import insertElementInSortedArrayWithSessionTimeCheck from '../../../../utils/insert-element-in-sorted-array-with-session-time-check';
import weekdaysRU from '../../../../utils/weekdays-ru';

const useHandleAdd = ({ modalState, values, index, insert }) => {
  const dispatch = useDispatch();
  const [, setState] = modalState;
  const { sessionTime, manually } = values;
  const { hours, mins, appointments } = manually;
  const close = () => setState({ isOpen: false, weekdayIndex: null });

  const handleAdd = () => {
    const weekday = weekdaysRU[index].toUpperCase();

    const value = Number(hours) + Number(mins);
    const day = appointments[index];
    const isValueInDay = day.includes(value);

    if (isValueInDay) {
      const message = `Запись на такое время в этот день (${weekday}) уже существует`;
    } else {
      insertElementInSortedArrayWithSessionTimeCheck(
        value,
        day,
        insert,
        sessionTime,
        dispatch,
        close
      );
      close();
    }
  };

  return handleAdd;
};

export default useHandleAdd;
