import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAppointmentService } from '../../../../../redux/appointments/actions';
import SubService from './sub-service/sub-service';
import Title from './title/title';

const computeDisabled = (startAt, availableAppointments, sessionTime, duration) => {
  const endAt = startAt + duration;
  for (let i = startAt; i < endAt; i += sessionTime) {
    if (!availableAppointments.includes(i)) return true;
  }

  return false;
};

const DisabledParameterService = ({ service, setStep }) => {
  const [isShown, setIsShown] = useState(false);
  const { title, subServices } = service;

  const [{ time, availableAppointments }, { sessionTime }] = useSelector((state) => [
    state.appointments.bookingAppointment,
    state.timetable,
  ]);

  const dispatch = useDispatch();

  return (
    <>
      <Title title={title} shownState={[isShown, setIsShown]} />

      {isShown &&
        subServices.map((subService, i) => {
          const { duration, id } = subService;
          const isLastService = i === subServices.length - 1;
          const isDisabled = time ? computeDisabled(time, availableAppointments, sessionTime, duration) : false; // for 2 case of wrapper

          const handleOnClick = () => {
            dispatch(setAppointmentService({ id, title, duration }));
            setStep((state) => {
              if (state.step === 2)
                return { ...state, isService: false, isResult: true, step: state.step + 1, lastStepName: 'service' }; // first was timetable
              return { ...state, isService: false, isTimetable: true, step: state.step + 1, lastStepName: 'service' }; // first was services
            });
          };

          return (
            <div
              onClick={isDisabled ? null : handleOnClick}
              className={`service ${isDisabled ? 'service--disabled' : ''} ${isLastService ? 'mb-s-4' : ''}`}
              key={i}>
              <SubService subService={subService} isLastService={isLastService} />
            </div>
          );
        })}
    </>
  );
};

export default DisabledParameterService;
