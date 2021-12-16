const displayDurations = (sessionTime) => {
  let string = '';
  for (let i = 1; i <= 3; i++) {
    const hours = Math.floor((sessionTime * i) / 60);
    const mins = (sessionTime * i) % 60;
    string += ` ${hours ? `${hours}ч` : ''}${mins ? ` ${mins}мин` : ''}${i !== 3 ? ',' : ''}`;
  }

  string += ' и т.д.';

  return string;
};

const PossibleServiceDurations = ({ values, className = '' }) => {
  const { sessionTime } = values.edit;

  return (
    <span className={`timetable-card__tip ${className}`}>
      Возможная длительность ваших услуг:
      <span className="timetable-card__tip--primary">{displayDurations(sessionTime)}</span>
    </span>
  );
};

export default PossibleServiceDurations;
