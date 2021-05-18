export const getDate = (year, month, day) => {
  const date = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
  date.setHours(0, 0, 0, 0); // reset gmt
  return date;
};

export const getUpdateDate = (update) => {
  if (!update.date) return null;

  const updateDate = new Date(update.date);
  updateDate.setHours(0, 0, 0, 0);

  return updateDate;
};
