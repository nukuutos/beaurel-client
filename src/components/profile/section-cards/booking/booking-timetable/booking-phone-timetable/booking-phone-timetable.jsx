import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { getTimetableSuccess } from "../../../../../../redux/timetable/actions";
// import { getPreviousWeek, getNextWeek } from "../utils/get-week";
import useWeek from "../use-week/use-week";
import { getAppointmentsSuccess, unsetAppointmentService } from "../../../../../../redux/appointments/actions";
import useAsyncAction from "../../../../../../hooks/use-async-action/use-async-action";
import useMediaQuery from "../../../../../../hooks/use-media-query";
import { getCurrentWeekday } from "./utils";

const BookingPhoneTimetable = ({ stepState, onClickClose }) => {
  const [{ step }, setStep] = stepState;

  const [weekDays, setWeekByDate] = useWeek(setStep);

  const router = useRouter();

  const dispatch = useDispatch();
  const [asyncAction, isLoading] = useAsyncAction();
  const [{ id: masterId }, timetable, appointments] = useSelector((state) => [
    state.profile,
    state.timetable,
    state.appointments,
  ]); // i can use query

  const [dateCounter, setDateCounter] = useState(getCurrentWeekday() + 1); // date counter from today
  const isPhone = useMediaQuery(600);

  const getDataForBooking = async () => {
    const config = {
      method: "get",
      url: `/master/${masterId}/timetable/booking`,
      accessToken: null,
    };

    const { timetable, appointments } = await asyncAction(config);

    if (timetable) {
      dispatch(getTimetableSuccess({ timetable: { masterId, ...timetable } }));
      dispatch(getAppointmentsSuccess({ appointments, masterId }));
    }
  };

  useEffect(() => {
    const queryMasterId = router.query.id;
    const isTimetable = timetable.masterId === queryMasterId;
    const isAppointments = appointments.booking.masterId === queryMasterId;

    if (!isTimetable && !isAppointments) getDataForBooking();
  }, []);

  const isUnavailableWeek = weekDays.every(({ props }) => !props.availableAppointments);

  const onClickBack =
    step === 2
      ? () => {
          dispatch(unsetAppointmentService());
          setStep((state) => {
            return { ...state, isService: true, isTimetable: false, step: state.step - 1 };
          });
        }
      : onClickClose;

  return (
    <div className={`booking-timetable ${isPhone ? "" : "card"}`}>
      {isLoading && <div className="spinner-with-background" />}

      <nav className={`modal__back-bar card card--layout`}>
        <div className="back-bar__main">
          <FontAwesomeIcon onClick={onClickBack} className="back-bar__icon mr-6" icon="arrow-left" />
          Выберите время
        </div>
      </nav>

      <div
        onClick={() => {
          setDateCounter((i) => {
            i = i - 1;

            if (i === -1) {
              setWeekByDate((today) => today.weekday(-7));
              return 6;
            }

            return i;
          });
        }}
        className={`booking-timetable__arrow btn-icon mr-6`}
      >
        <FontAwesomeIcon icon="chevron-left" />
      </div>

      <div
        onClick={() => {
          setDateCounter((i) => {
            i = i + 1;

            if (i === weekDays.length) {
              setWeekByDate((today) => today.weekday(7));
              return 0;
            }

            return i;
          });
        }}
        className={`booking-timetable__arrow booking-timetable__arrow--right btn-icon ml-6`}
      >
        <FontAwesomeIcon icon="chevron-right" />
      </div>

      {weekDays[dateCounter]}

      {isUnavailableWeek && (
        <div className="booking-timetable__no-appointments">
          На этой неделе нет свободных записей!
          <div
            onClick={() => {
              setWeekByDate((today) => today.weekday(7));
              setDateCounter(0);
            }}
            className="btn-text"
          >
            следующая неделя
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPhoneTimetable;
