import React from "react";
import { useSelector, useDispatch } from "react-redux";
import displayDuration from "../services/utils/display-duration";
import useAsyncAction from "../../../../hooks/use-async-action/use-async-action";
import {
  unsetAppointmentService,
  unsetAppointmentDate,
  bookAppointmentSuccess,
} from "../../../../redux/appointments/actions";
import { MONTHS } from "./booking-timetable/utils/week";
import useMediaQuery from "../../../../hooks/use-media-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BookingResult = ({ setStep }) => {
  const [{ date, time, service }, { accessToken, id: profileId }] = useSelector((state) => [
    state.appointments.booking.bookingAppointment,
    state.auth,
  ]);

  console.log(date.format());

  const isPhone = useMediaQuery(600);

  const dispatch = useDispatch();
  const [asyncAction, isLoading] = useAsyncAction();

  const bookTime = async () => {
    const config = {
      method: "post",
      url: `/master/${profileId}/appointment`,
      data: {
        serviceId: service.id,
        time: { startAt: time, endAt: time + service.duration },
        date: date.format(),
      },
      accessToken, // ?
    };

    const alert = await asyncAction(config);

    if (alert) {
      // add this appointment to booking appointments this
      const stringDate = date.format("DD-MM-YYYY");
      dispatch(bookAppointmentSuccess({ date: stringDate, time: { startAt: time, endAt: time + service.duration } }));

      setStep((state) => {
        return { ...state, isResult: false, isSuccess: true, step: state.step + 1 };
      });
    }
  };

  return (
    <>
      {isLoading && isPhone && <div className="spinner-with-background" />}

      <div className={`booking-result ${isPhone ? "" : "card"}`}>
        {isLoading && !isPhone && <div className="spinner-with-background" />}

        {isPhone && (
          <nav className={`modal__back-bar card card--layout`}>
            <div className="back-bar__main">
              <FontAwesomeIcon
                onClick={() =>
                  setStep((state) => {
                    if (state.lastStepName === "service") {
                      dispatch(unsetAppointmentService());
                      return { ...state, isResult: false, isService: true, step: state.step - 1 };
                    }
                    // timetable case
                    dispatch(unsetAppointmentDate());
                    return { ...state, isResult: false, isTimetable: true, step: state.step - 1 };
                  })
                }
                className="back-bar__icon mr-6"
                icon="arrow-left"
              />
              Информация о записи
            </div>
          </nav>
        )}

        {!isPhone && <h2 className="booking-result__heading heading heading--modal">Информация о записи</h2>}
        <img className="booking-result__svg" src="/svg/appointment.svg" alt="Appointment image" />
        <span className="booking-result__label mt-6">Услуга:</span>
        <div className="booking-result__value mt-6">{service.title}</div>

        <span className="booking-result__label mt-2">Время:</span>
        <div className="booking-result__value mt-2">
          {displayDuration(time)} - {displayDuration(service.duration + time)}
        </div>
        <span className="booking-result__label mt-2">Дата:</span>
        <div className="booking-result__value mt-2">
          {date.date()} {MONTHS[date.month()].toLowerCase()} {date.year()}
        </div>

        <div className="booking-result__buttons mt-6">
          {!isPhone && (
            <button
              onClick={() =>
                setStep((state) => {
                  if (state.lastStepName === "service") {
                    dispatch(unsetAppointmentService());
                    return { ...state, isResult: false, isService: true, step: state.step - 1 };
                  }
                  // timetable case
                  dispatch(unsetAppointmentDate());
                  return { ...state, isResult: false, isTimetable: true, step: state.step - 1 };
                })
              }
              className={`btn btn--secondary  btn--gray mr-4`}
              type="submit"
            >
              Назад
            </button>
          )}
          <button disabled={isLoading} onClick={bookTime} className={`btn btn--primary `} type="submit">
            Записаться
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingResult;
