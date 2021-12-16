import React from 'react';
import { getDateUTC } from '../../../utils/dayjs';

const ConfirmationButton = ({ submit, choice }) => {
  const handleClick = () => {
    const [day, month, year] = [choice.date(), choice.month(), choice.year()];
    const stringDate = `${year}-${month + 1}-${day}`;
    const dateObject = getDateUTC(stringDate);
    submit(dateObject);
  };

  return (
    <div className="date-picker__buttons mt-4">
      <div onClick={handleClick} className="date-picker__button btn btn--primary">
        ОК
      </div>
    </div>
  );
};

export default ConfirmationButton;
