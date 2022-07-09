import insertElementInSortedArray from '../../utils/insert-element-in-sorted-array';

const getTimeData = ({ time, values, index, remove, insert }) => {
  const { exceptions } = values.auto;
  const exceptionDay = exceptions[index];

  const exceptionData = {
    onClick: () => {
      const indexToDelete = exceptionDay.indexOf(time);
      remove(indexToDelete);
    },
    className: 'weekday__time--exception',
  };

  const possibleTimeData = {
    onClick: () => insertElementInSortedArray(time, exceptionDay, insert),
    className: '',
  };

  const isException = exceptionDay.includes(time);

  return isException ? exceptionData : possibleTimeData;
};

export default getTimeData;
