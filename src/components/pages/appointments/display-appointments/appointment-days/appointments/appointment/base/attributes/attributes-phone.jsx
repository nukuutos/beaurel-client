import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React from 'react';
import displayDuration from '../../utils/display-duration';

const AttributesPhone = ({ date, startAt, price }) => {
  const formattedDate = dayjs(date).utc(true).format('DD.MM.YY');

  return (
    <div className="appointment-card__attributes">
      <div className="appointment-card__date appointment-card__attribute">
        <FontAwesomeIcon icon={['far', 'calendar']} /> {formattedDate}
      </div>
      <div className="appointment-card__time appointment-card__attribute">
        <FontAwesomeIcon icon="clock" />
        {displayDuration(startAt)}
      </div>
      <div className="appointment-card__price appointment-card__attribute">
        <FontAwesomeIcon icon="ruble-sign" />
        {price}
      </div>
    </div>
  );
};

export default AttributesPhone;
