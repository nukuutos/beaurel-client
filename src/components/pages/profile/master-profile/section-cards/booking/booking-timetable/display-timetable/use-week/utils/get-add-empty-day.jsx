import Day from '../day/day';

const getAddEmptyDay = ({ weekDays, date, getHandleClickOnDay }) =>
  function () {
    weekDays.push(
      <Day date={date} getHandleClickOnDay={getHandleClickOnDay} key={date.format()} />
    );
    return { isContinue: true, appointments: null };
  };

export default getAddEmptyDay;
