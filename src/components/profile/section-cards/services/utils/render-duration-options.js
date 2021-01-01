import displayDuration from './display-duration';

const renderDurationOptions = (sessionTime) => {
  const optionComponents = [];
  const hours24InMins = 1440;

  for (let i = sessionTime; i < hours24InMins; i += sessionTime) {
    optionComponents.push(
      <option value={i} key={i}>
        {displayDuration(i)}
      </option>
    );
  }

  return optionComponents;
};

export default renderDurationOptions;
