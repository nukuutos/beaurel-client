import useDatePicker from './hooks/use-date-picker/use-date-picker';
import useChoice from './hooks/use-choice';
import useGetClassName from './hooks/use-get-class-name';
import useSwipes from './hooks/use-swipes';
import Header from './header';
import DisplayChoice from './display-choices';
import DisplayWeekdaysNames from './display-weekdays-names';
import DisplayDates from './display-dates';
import ConfirmationButton from './confirmation-button';
import useIsArrowDisabled from './hooks/use-is-arrow-disabled';

const DatePicker = ({ className, submit }) => {
  const [dates, monthDates, handleClicks] = useDatePicker();

  const [choice, handleClick] = useChoice({ monthDates, handleClicks });

  const getClassName = useGetClassName({ choice, monthDates });

  const isArrowDisabled = useIsArrowDisabled(monthDates);

  const handlers = useSwipes({ handleClicks, isArrowDisabled });

  return (
    <div {...handlers} className={`date-picker ${className}`}>
      <Header handleClicks={handleClicks} monthDates={monthDates} />
      <DisplayChoice choice={choice} />
      <DisplayWeekdaysNames />
      <DisplayDates dates={dates} getClassName={getClassName} handleClick={handleClick} />
      <ConfirmationButton submit={submit} choice={choice} />
    </div>
  );
};

export default DatePicker;
