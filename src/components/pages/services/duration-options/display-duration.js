const displayDuration = (duration) => {
  let hours = String(Math.floor(duration / 60));
  let mins = String(duration % 60);

  // return hours ? `${hours}h ${mins}min` : `${mins}min`;
  hours = hours.length === 1 ? `0${hours}` : hours;
  mins = mins.length === 1 ? `0${mins}` : mins;

  return `${hours}:${mins}`;
};

export default displayDuration;
