import displayDuration from '../../services/utils/display-duration';
import { translateWeekdaysFromEN } from './translate';

const weekdaysRU = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

// rename it
const displayExceptions = (exceptions) => {
  const output = [];

  for (const dayIndex in exceptions) {
    if (!exceptions[dayIndex].length) continue;

    const russianDayName = weekdaysRU[dayIndex].toUpperCase();

    let text = russianDayName + ': ';

    exceptions[dayIndex].forEach((time, i) => {
      text = text + displayDuration(time);
      if (i !== exceptions[dayIndex].length - 1) text = text + ', ';
    });

    output.push(<div key={dayIndex}>{text}</div>);
  }

  return output;
};

export default displayExceptions;
