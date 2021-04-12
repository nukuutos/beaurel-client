// filter excetion
const filterExceptions = (exceptions, sessionTime, startAt) => {
  const newExceptions = {};

  for (let day in exceptions) {
    newExceptions[day] = exceptions[day].filter((time) => {
      return (time - startAt) % sessionTime === 0;
    });
  }

  return newExceptions;
};

export default filterExceptions;
