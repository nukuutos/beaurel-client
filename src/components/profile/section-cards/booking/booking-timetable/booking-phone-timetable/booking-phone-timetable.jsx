import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { getTimetableSuccess } from "../../../../../../redux/timetable/actions";
import useWeek from "../use-week/use-week";
import { getAppointmentsSuccess, unsetAppointmentService } from "../../../../../../redux/appointments/actions";
import useAsyncAction from "../../../../../../hooks/use-async-action/use-async-action";
import useMediaQuery from "../../../../../../hooks/use-media-query";
import { getCurrentWeekday } from "./utils";
import { useSwipeable } from "react-swipeable";

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

  const [dateCounter, setDateCounter] = useState((getCurrentWeekday() + 1) % 7); // date counter from today

  useEffect(() => {
    if (getCurrentWeekday() + 1 === 7) setWeekByDate((today) => today.weekday(7));
  }, []);

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

  const toPrevDay = () => {
    setDateCounter((i) => {
      i = i - 1;

      if (i === -1) {
        setWeekByDate((today) => today.weekday(-7));
        return 6;
      }

      return i;
    });
  };

  const toNextDay = () => {
    setDateCounter((i) => {
      i = i + 1;

      if (i === weekDays.length) {
        setWeekByDate((today) => today.weekday(7));
        return 0;
      }

      return i;
    });
  };

  const handlers = useSwipeable(
    isUnavailableWeek
      ? {}
      : {
          onSwipedLeft: toNextDay,
          onSwipedRight: toPrevDay,
          delta: 10,
        }
  );

  return (
    <>
      {isLoading && <div className="spinner-with-background" />}
      <div {...handlers} className={`booking-timetable ${isPhone ? "" : "card"}`}>
        <nav className={`modal__back-bar card card--layout`}>
          <div className="back-bar__main">
            <FontAwesomeIcon onClick={onClickBack} className="back-bar__icon mr-6" icon="arrow-left" />
            Выберите время
          </div>
        </nav>

        {!isUnavailableWeek && (
          <>
            <div onClick={toPrevDay} className="booking-timetable__side">
              <div className={`booking-timetable__arrow btn-icon`}>
                <FontAwesomeIcon icon="chevron-left" />
              </div>
            </div>

            <div onClick={toNextDay} className="booking-timetable__side booking-timetable__side--right">
              <div className={`booking-timetable__arrow booking-timetable__arrow--right btn-icon`}>
                <FontAwesomeIcon icon="chevron-right" />
              </div>
            </div>
          </>
        )}

        {weekDays[dateCounter]}

        {!weekDays[dateCounter].props.availableAppointments && !isUnavailableWeek && (
          <p className="booking-timetable__no-appointments">Нет записей</p>
        )}

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
    </>
  );
};

export default BookingPhoneTimetable;
