const displayMin = (min) => {
  min = String(min);
  return min.length === 1 ? '0' + min : min;
};

const renderMins = () => {
  const optionComponents = [];
  const minsInHour = 60;

  for (let i = 0; i < minsInHour; i += 5) {
    optionComponents.push(
      <option value={i} key={i}>
        {displayMin(i)}
      </option>
    );
  }

  return optionComponents;
};

export default renderMins;
