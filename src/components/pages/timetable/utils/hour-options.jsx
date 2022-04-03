const displayHour = (hour) => {
  hour = String(hour);
  return hour.length === 1 ? `0${hour}` : hour;
};

const hours24InMins = 1440;

const HourOptions = ({ startAt = 0, endAt = hours24InMins }) => {
  const optionComponents = [];

  for (let i = startAt; i < endAt; i += 60) {
    optionComponents.push(
      <option value={i} key={i}>
        {displayHour(i / 60)}
      </option>
    );
  }

  return optionComponents;
};

export default HourOptions;
