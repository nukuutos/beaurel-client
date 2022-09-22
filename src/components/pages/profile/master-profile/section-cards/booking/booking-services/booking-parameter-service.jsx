import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import SubService from '../../../../../services/base/parameter-service/sub-service';
import ParameterServiceTitle from '../../../../../services/base/parameter-service/parameter-service-title';
import getIsDisabled from './utils/get-is-disabled';
import getCorrectService from './utils/get-correct-service';
import ChevronRight from '../../../../../../base/icons/chevron-right';

const BookingParameterService = ({ service, state, getPickService, isAfterUpdate }) => {
  const [timetable] = useSelector((state) => [state.timetable]);

  const { step, date, time, unavailableAppointments, availableAppointments } = state;
  const [isShown, setIsShown] = useState(false);
  const [isHoverSubService, setIsHoverSubService] = useState(false);

  const { title, subServices } = service;

  return (
    <div
      className={`${
        !isHoverSubService ? 'booking-service-parameter--hover ' : ''
      } booking-service-parameter card mt-6`}
    >
      <div onClick={() => setIsShown(!isShown)} className="service">
        <ParameterServiceTitle title={title} shownState={[isShown, setIsShown]} />
      </div>

      {isShown &&
        subServices.map((subService, i) => {
          const bookingSubService = getCorrectService({
            step,
            service: { title, ...subService },
            today: date,
            isAfterUpdate,
          });

          const pickService = getPickService(bookingSubService);

          const isDisabled = getIsDisabled(
            { date, time, unavailableAppointments, availableAppointments },
            bookingSubService,
            timetable
          );

          return (
            <div
              onMouseLeave={() => setIsHoverSubService(false)}
              onMouseEnter={() => setIsHoverSubService(true)}
              onClick={isDisabled ? null : pickService}
              className={`service service--hover booking-service service-parameter__sub-service ${
                isDisabled ? 'booking-service--disabled' : ''
              }`}
              key={subService.parameter}
            >
              <SubService subService={bookingSubService} />

              <div className="booking-service__arrow">
                <ChevronRight />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default BookingParameterService;
