import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAppointmentService } from "../../../../../redux/appointments/actions";
import SubService from "../../../../services/parameter-service/sub-service";
import Title from "../../../../services/parameter-service/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getIsDisabled from "./utils/get-is-disabled";
import getCorrectService from "./utils/get-correct-service";

const BookingParameterService = ({ service, setStep, isUpdated }) => {
  const [{ bookingAppointment }, timetable] = useSelector((state) => [state.appointments.booking, state.timetable]);
  const dispatch = useDispatch();

  const [isShown, setIsShown] = useState(false);
  const [isHoverSubService, setIsHoverSubService] = useState(false);

  const { title, subServices } = service;

  return (
    <div
      className={`${!isHoverSubService ? "booking-service-parameter--hover " : ""} booking-service-parameter card mt-6`}
    >
      <div onClick={() => setIsShown(!isShown)} className="service">
        <Title title={title} shownState={[isShown, setIsShown]} />
      </div>

      {isShown &&
        subServices.map((subService, i) => {
          const { duration, id } = subService;

          const isDisabled = getIsDisabled(bookingAppointment, subService, timetable);

          const handleOnClick = () => {
            dispatch(setAppointmentService({ id, title, duration }));
            setStep((state) => {
              if (state.step === 2)
                return { ...state, isService: false, isResult: true, step: state.step + 1, lastStepName: "service" }; // first was timetable
              return { ...state, isService: false, isTimetable: true, step: state.step + 1, lastStepName: "service" }; // first was services
            });
          };

          return (
            <div
              onMouseLeave={() => setIsHoverSubService(false)}
              onMouseEnter={() => setIsHoverSubService(true)}
              onClick={isDisabled ? null : handleOnClick}
              className={`service service--hover booking-service ${isDisabled ? "booking-service--disabled" : ""}`}
              key={i}
            >
              <SubService subService={getCorrectService(subService, bookingAppointment.date, isUpdated)} />

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
