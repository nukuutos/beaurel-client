import displayDuration from '../../services/utils/display-duration';
import { translateWeekdaysFromEN } from './translate';

// rename it
const displayExceptions = (exceptions) => {
  const output = [];

  for (const day in exceptions) {
    if (!exceptions[day].length) continue;

    const russianDayName = translateWeekdaysFromEN[day].toUpperCase();

    let text = russianDayName + ': ';

    exceptions[day].forEach((time, i) => {
      text = text + displayDuration(time);
      if (i !== exceptions[day].length - 1) text = text + ', ';
    });

    output.push(<div>{text}</div>);
  }

  return output;
};

export default displayExceptions;
