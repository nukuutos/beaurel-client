import dayjs from 'dayjs';
import React from 'react';
import FarCalendar from '../../../../../../../base/icons/far-calendar';
import Ruble from '../../../../../../../base/icons/ruble';
import Time from '../../../../../../../base/icons/time.';
import displayDuration from '../../../../../../utils/display-duration';

const AttributesDesktop = ({ date, startAt, price }) => {
  const formattedDate = dayjs(date).utc().format('DD.MM.YY');
  return (
    <>
      <div className="appointment-card__date appointment-card__attribute mt-2">
        <FarCalendar />
        {formattedDate}
      </div>
      <div className="appointment-card__time appointment-card__attribute mt-4">
        <Time />
        {displayDuration(startAt)}
      </div>
      <div className="appointment-card__price appointment-card__attribute mt-4">
        <Ruble />
        {price}
      </div>
    </>
  );
};

export default AttributesDesktop;
