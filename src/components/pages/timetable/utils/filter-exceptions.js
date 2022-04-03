// filter excetion
const filterExceptions = (exceptions, sessionTime, startAt) => {
  sessionTime = Number(sessionTime);

  const newExceptions = {};

  for (const day in exceptions) {
    newExceptions[day] = exceptions[day].filter((time) => (time - startAt) % sessionTime === 0);
  }

  return newExceptions;
};

export default filterExceptions;
