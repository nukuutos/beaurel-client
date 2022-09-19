import insertElementInSortedArrayWithSessionTimeCheck from './insert-element-in-sorted-array-with-session-time-check';
import weekdaysRU from '../../../utils/weekdays-ru';

const useHandleAdd = ({ closeModal, setFieldError, values, index, insert }) => {
  const { sessionTime, manually } = values;
  const { hours, mins, appointments } = manually;

  const handleAdd = () => {
    const weekday = weekdaysRU[index].toUpperCase();

    const value = Number(hours) + Number(mins);
    const day = appointments[index];
    const isValueInDay = day.includes(value);

    if (isValueInDay) {
      const message = `Запись на такое время в этот день (${weekday}) уже существует`;
      setFieldError('manually.hours', message);
    } else {
      insertElementInSortedArrayWithSessionTimeCheck(
        value,
        day,
        insert,
        Number(sessionTime),
        setFieldError,
        closeModal
      );
    }
  };

  return handleAdd;
};

export default useHandleAdd;
