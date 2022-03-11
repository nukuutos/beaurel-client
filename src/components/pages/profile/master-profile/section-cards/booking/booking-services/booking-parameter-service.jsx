import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubService from '../../../../../services/base/parameter-service/sub-service';
import Title from '../../../../../services/base/parameter-service/title';
import getIsDisabled from './utils/get-is-disabled';
import getCorrectService from './utils/get-correct-service';
import goTo from './go-to';

const BookingParameterService = ({ service, stepState, isAfterUpdate }) => {
  const [{ bookingAppointment }, timetable] = useSelector((state) => [
    state.appointments.booking,
    state.timetable,
  ]);

  const [{ step }, setStep] = stepState;

  const { date } = bookingAppointment;

  const dispatch = useDispatch();

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
        <Title title={title} shownState={[isShown, setIsShown]} />
      </div>

      {isShown &&
        subServices.map((subService, i) => {
          const bookingSubService = getCorrectService({
            step,
            service: { title, ...subService },
            today: date,
            isAfterUpdate,
          });

          const isDisabled = getIsDisabled(bookingAppointment, bookingSubService, timetable);

          const handleOnClick = goTo({
            setStep,
            service: bookingSubService,
            dispatch,
            isAfterUpdate,
          });

          return (
            <div
              onMouseLeave={() => setIsHoverSubService(false)}
              onMouseEnter={() => setIsHoverSubService(true)}
              onClick={isDisabled ? null : handleOnClick}
              className={`service service--hover booking-service service-parameter__sub-service ${
                isDisabled ? 'booking-service--disabled' : ''
              }`}
              key={subService.parameter}
            >
              <SubService subService={bookingSubService} />

              <div className="booking-service__arrow">
                <FontAwesomeIcon icon="chevron-right" />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default BookingParameterService;
