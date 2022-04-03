import insertElementInSortedArray from '../../../utils/insert-element-in-sorted-array';

const getWeekdayData = ({ values, weekdayIndex, remove, insert }) => {
  const { weekends } = values.auto;

  const onPop = {
    onClick: () => {
      const indexToDelete = weekends.indexOf(weekdayIndex);
      remove(indexToDelete);
    },
    className: 'weekends__day--exception',
  };

  const onPush = {
    onClick: () => insertElementInSortedArray(weekdayIndex, weekends, insert),
    className: '',
  };

  const isWeekend = weekends.includes(weekdayIndex);

  return isWeekend ? onPop : onPush;
};

export default getWeekdayData;
