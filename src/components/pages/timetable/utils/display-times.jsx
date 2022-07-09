import displayDuration from '../../utils/display-duration';
import weekdaysRU from './weekdays-ru';

const displayTimes = (week) => {
  const output = [];

  for (const dayIndex in week) {
    const day = week[dayIndex];

    if (!day.length) continue;

    const russianDayName = weekdaysRU[dayIndex].toUpperCase();

    let text = `${russianDayName}: `;

    day.forEach((time, i) => {
      text += displayDuration(time);
      if (i !== day.length - 1) text += ', ';
    });

    output.push(<div key={dayIndex}>{text}</div>);
  }

  return output;
};

export default displayTimes;
