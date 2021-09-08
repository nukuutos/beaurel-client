import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTimetableSuccess } from "../../../../../redux/timetable/actions";
import { useDispatch, useSelector } from "react-redux";
import useWeek from "./use-week/use-week";
import { getAppointmentsSuccess, unsetAppointmentService } from "../../../../../redux/appointments/actions";
import useAsyncAction from "../../../../../hooks/use-async-action/use-async-action";
import { useRouter } from "next/router";

const BookingTimetable = ({ stepState }) => {
  const [{ step }, setStep] = stepState;

  const [weekDays, setDate] = useWeek(setStep);
  const router = useRouter();

  const dispatch = useDispatch();
  const [asyncAction, isLoading] = useAsyncAction();
  const [{ id: masterId }, timetable, appointments] = useSelector((state) => [
    state.profile,
    state.timetable,
    state.appointments,
  ]); // i can use query

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

  // do we need it?
  // useEffect(() => {
  //   // const queryMasterId = router.query.id;
  //   // const isTimetable = timetable.masterId === queryMasterId;
  //   const isUnavailableWeek = weekDays.every(({ props }) => !props.availableAppointments);
  //   // isTimetable is important!
  //   // if (isTimetable && isUnavailableWeek) setDate((today) => getNextWeek(today));
  //   if (isUnavailableWeek) setIsNextWeekMessage(true);
  // }, []);
  const isUnavailableWeek = weekDays.every(({ props }) => !props.availableAppointments);

  return (
    <div className={`booking-timetable ${step === 2 ? "booking-timetable--back" : ""} card`}>
      {isLoading && <div className="spinner-with-background" />}

      {step === 2 && (
        <div
          onClick={() => {
            dispatch(unsetAppointmentService());
            setStep((state) => {
              return { ...state, isService: true, isTimetable: false, step: state.step - 1 };
            });
          }}
          className="booking-timetable__back-btn"
        >
          <FontAwesomeIcon icon="chevron-left" /> Вернуться к выбору услуги
        </div>
      )}

      {/* back button */}
      {/* {step === 2 && (
        <div
          onClick={() => {
            dispatch(unsetAppointmentService());
            setStep((state) => {
              return { ...state, isService: true, isTimetable: false, step: state.step - 1 };
            });
          }}
          className="btn btn--secondary btn--gray booking-timetable__btn-back"
        >
          Назад
        </div>
      )} */}

      <div className="booking-timetable__header  mb-7">
        <div onClick={() => setDate((today) => today.weekday(-7))} className={`booking-timetable__arrow btn-icon mr-6`}>
          <FontAwesomeIcon icon="chevron-left" />
        </div>
        <h2 className="heading booking-timetable__heading ">Выберите Время</h2>
        <div onClick={() => setDate((today) => today.weekday(7))} className={`booking-timetable__arrow btn-icon ml-6`}>
          <FontAwesomeIcon icon="chevron-right" />
        </div>
      </div>

      {weekDays}

      {isUnavailableWeek && (
        <div className="booking-timetable__no-appointments">
          На этой неделе нет свободных записей!
          <div onClick={() => setDate((today) => today.weekday(7))} className="btn-text mt-2">
            следующая неделя
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingTimetable;
