const displayHour = (hour) => {
  hour = String(hour);
  return hour.length === 1 ? `0${hour}` : hour;
};

const HourOptions = () => {
  const optionComponents = [];
  const hours24InMins = 1440;

  for (let i = 0; i < hours24InMins; i += 60) {
    optionComponents.push(
      <option value={i} key={i}>
        {displayHour(i / 60)}
      </option>
    );
  }

  return optionComponents;
};

export default HourOptions;
