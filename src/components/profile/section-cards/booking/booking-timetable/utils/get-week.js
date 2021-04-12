export const getNextWeek = (today) => new Date(today.setDate(today.getDate() + 7));
export const getPreviousWeek = (today) => new Date(today.setDate(today.getDate() - 7));
