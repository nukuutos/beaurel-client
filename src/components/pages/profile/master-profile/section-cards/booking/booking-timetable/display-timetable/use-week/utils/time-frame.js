export const getIsFromDate = (date, fromDate) => {
  if (fromDate) return date.isSameOrAfter(fromDate);
  return true;
};

export const getIsUntilDate = (date, untilDate) => {
  if (untilDate) return date.isBefore(untilDate);
  return true;
};

export const getIsWithinTimeFrame = ({ date, untilDate, fromDate, step }) => {
  if (step === 1) return true;
  const isFrom = getIsFromDate(date, fromDate);
  const isUntil = getIsUntilDate(date, untilDate);
  return isFrom && isUntil;
};
