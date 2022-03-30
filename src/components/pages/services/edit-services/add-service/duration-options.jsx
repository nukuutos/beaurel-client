import { useSelector } from 'react-redux';
import displayDuration from '../../duration-options/display-duration';

const nineHours = 540;

const DurationOptions = ({ maxDuration = nineHours, isUpdate = false }) => {
  const { sessionTime, update } = useSelector((state) => state.timetable);

  let sessionTimeToUse = sessionTime;
  if (isUpdate && update) sessionTimeToUse = update.sessionTime;

  if (!sessionTimeToUse) return [];

  const optionComponents = [];

  for (let i = sessionTimeToUse; i <= maxDuration; i += sessionTimeToUse) {
    optionComponents.push(
      <option value={i} key={i}>
        {displayDuration(i)}
      </option>
    );
  }

  return optionComponents;
};

export default DurationOptions;
