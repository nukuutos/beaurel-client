const displayDuration = (duration = 60) => {
  duration = Number(duration);

  let hours = String(Math.floor(duration / 60));
  let mins = String(duration % 60);

  hours = hours.length === 1 ? `0${hours}` : hours;
  mins = mins.length === 1 ? `0${mins}` : mins;

  return `${hours}:${mins}`;
};

export default displayDuration;
