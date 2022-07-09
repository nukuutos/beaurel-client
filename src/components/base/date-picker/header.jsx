import React from 'react';
import ChevronLeft from '../icons/chevron-left';
import ChevronRight from '../icons/chevron-right';
import useIsArrowDisabled from './hooks/use-is-arrow-disabled';
import { MONTHS } from './utils';

const Header = ({ handleClicks, monthDates }) => {
  const { handleNext, handlePrev } = handleClicks;

  const [firstMonthDate] = monthDates;
  const month = MONTHS[firstMonthDate.month()];
  const year = firstMonthDate.year();

  const isArrowDisabled = useIsArrowDisabled(monthDates);
  const disabledClassName = isArrowDisabled ? 'date-picker__arrow--disabled' : '';

  return (
    <>
      <div
        onClick={handlePrev}
        className={`date-picker__arrow date-picker__arrow--left ${disabledClassName} ml-1`}
      >
        <ChevronLeft />
      </div>

      <div className="date-picker__month-and-year">{`${month}, ${year}`}</div>

      <div onClick={handleNext} className="date-picker__arrow date-picker__arrow--right mr-1">
        <ChevronRight />
      </div>
    </>
  );
};

export default Header;
