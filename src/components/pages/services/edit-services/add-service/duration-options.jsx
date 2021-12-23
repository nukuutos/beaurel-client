import { useSelector } from 'react-redux';
import displayDuration from '../../hooks/use-duration-options/display-duration';

const DurationOptions = ({ isUpdate = false }) => {
  const { sessionTime, update } = useSelector((state) => state.timetable);

  let sessionTimeToUse = sessionTime;
  if (isUpdate && update) sessionTimeToUse = update.sessionTime;

  if (!sessionTimeToUse) return [];

  const optionComponents = [];
  const hours24InMins = 1440;

  for (let i = sessionTimeToUse; i < hours24InMins; i += sessionTimeToUse) {
    optionComponents.push(
      <option value={i} key={i}>
        {displayDuration(i)}
      </option>
    );
  }

  return optionComponents;
};

export default DurationOptions;
