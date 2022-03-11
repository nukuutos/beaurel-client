const handleTimeFrame = ({ addEmptyDay, date, today, isWithinTimeFrame }) => {
  if (date.isSameOrBefore(today) || !isWithinTimeFrame) {
    return addEmptyDay();
  }

  return { isContinue: false };
};

export default handleTimeFrame;
