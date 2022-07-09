import dayjs from 'dayjs';
import React from 'react';
import FarCalendar from '../../../../../../../base/icons/far-calendar';
import Ruble from '../../../../../../../base/icons/ruble';
import Time from '../../../../../../../base/icons/time.';
import displayDuration from '../../../../../../utils/display-duration';

const AttributesPhone = ({ date, startAt, price }) => {
  const formattedDate = dayjs(date).utc().format('DD.MM.YY');

  return (
    <div className="appointment-card__attributes">
      <div className="appointment-card__date appointment-card__attribute">
        <FarCalendar /> {formattedDate}
      </div>
      <div className="appointment-card__time appointment-card__attribute">
        <Time />
        {displayDuration(startAt)}
      </div>
      <div className="appointment-card__price appointment-card__attribute">
        <Ruble />
        {price}
      </div>
    </div>
  );
};

export default AttributesPhone;
