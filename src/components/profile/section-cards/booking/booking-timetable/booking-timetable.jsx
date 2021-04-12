import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTimetableSuccess } from '../../../../../redux/timetable/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getPreviousWeek, getNextWeek } from './utils/get-week';
import useWeek from './use-week/use-week';
import {
  getAppointmentsSuccess,
  unsetAppointmentDate,
  unsetAppointmentService,
} from '../../../../../redux/appointments/actions';
import useAsyncAction from '../../../../../hooks/useAsyncAction';
import { useRouter } from 'next/router';

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
      method: 'get',
      url: `/profile/${masterId}/timetable/booking`,
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
    // const isTimetable = timetable && timetable.masterId === queryMasterId;
    // const isAppointments = appointments && appointments.booking.masterId === queryMasterId;
    const isTimetable = timetable.masterId === queryMasterId;
    const isAppointments = appointments.booking.masterId === queryMasterId;

    if (!isTimetable && !isAppointments) getDataForBooking();
  }, []);

  return (
    <div className={`booking-timetable card `}>
      {isLoading && <div className="spinner-with-background" />}

      {/* back button */}
      {step === 2 && (
        <div
          onClick={() => {
            dispatch(unsetAppointmentService());
            setStep((state) => {
              return { ...state, isService: true, isTimetable: false, step: state.step - 1 };
            });
          }}
          className="btn btn--secondary btn--gray booking-timetable__btn-back">
          Назад
        </div>
      )}

      <div className="booking-timetable__header mb-7">
        <div
          onClick={() => setDate((today) => getPreviousWeek(today))}
          className={`booking-timetable__arrow btn--edit mr-6`}>
          <FontAwesomeIcon icon="chevron-left" />
        </div>
        <h2 className="heading-primary booking-timetable__heading ">Выбери Время</h2>
        <div
          onClick={() => setDate((today) => getNextWeek(today))}
          className={`booking-timetable__arrow btn--edit ml-6`}>
          <FontAwesomeIcon icon="chevron-right" />
        </div>
      </div>

      {weekDays}
    </div>
  );
};

export default BookingTimetable;
