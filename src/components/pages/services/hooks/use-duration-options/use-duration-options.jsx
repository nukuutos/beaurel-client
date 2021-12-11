import { useSelector } from 'react-redux';
import displayDuration from './display-duration';

const useDurationOptions = ({ isUpdate } = { isUpdate: false }) => {
  const { sessionTime, update } = useSelector((state) => state.timetable);

  let sessionTimeToUse = sessionTime;
  if (isUpdate && update) sessionTimeToUse = update.sessionTime;

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

export default useDurationOptions;
