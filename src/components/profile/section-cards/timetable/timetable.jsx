import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTimetableSuccess } from '../../../../redux/timetable/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getPreviousWeek, getNextWeek } from './utils/get-week';
import useWeek from './hooks/useWeek';
import asyncCall from '../../../../utils/async-call';
import { getAppointmentsSuccess } from '../../../../redux/appointments/actions';

const Timetable = ({ stepState }) => {
  const [{ step }, setStep] = stepState;
  const [weekDays, setDate] = useWeek(setStep);
  const isCancelled = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { id: profileId } = useSelector((state) => state.profile);

  const getTimetableAndAppointments = async () => {
    const config = {
      method: 'get',
      url: `/profile/${profileId}/timetable/appointment`,
      accessToken: null,
    };

    setIsLoading(true);

    const { timetable, appointments } = await asyncCall(dispatch, config);

    if (timetable) {
      dispatch(getTimetableSuccess({ timetable }));
      dispatch(getAppointmentsSuccess({ appointments }));
    }

    if (!isCancelled.current) setIsLoading(false);
  };

  useEffect(() => {
    getTimetableAndAppointments();
  }, []);

  return (
    <div className="booking-timetable card">
      {/* back button */}
      {step === 2 && (
        <div
          onClick={() =>
            setStep((state) => {
              return { ...state, isService: true, isTimetable: false, step: state.step - 1 };
            })
          }
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

export default Timetable;
