import React, { useState, useRef, useEffect } from 'react';
import Modal from '../../../utils/modal';
import { useSelector, useDispatch } from 'react-redux';
import displayDuration from '../services/utils/display-duration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import asyncCall from '../../../../utils/async-call';
import Spinner from '../../../utils/spinner';
import { setAlert } from '../../../../redux/alert/actions';

const BookingResult = ({ setStep }) => {
  const [{ date, time, service }, { accessToken, id: profileId }] = useSelector((state) => [
    state.appointments.bookingAppointment,
    state.auth,
  ]);
  const isCancelled = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    const config = {
      method: 'post',
      url: `/profile/${profileId}/appointment`,
      data: { serviceId: service.id, time: { startAt: time, endAt: time + service.duration }, date },
      accessToken,
    };

    setIsLoading(true);

    // const alert = await asyncCall(dispatch, config);

    // if (alert) {
    if (true) {
      // const { ids, ...alert } = data;
      // dispatch(addServiceSuccess({ service: { ids, ...service } }));
      // dispatch(setAlert(alert));
      setStep((state) => {
        return { ...state, isResult: false, isSuccess: true, step: state.step + 1 };
      });
    }

    if (!isCancelled.current) setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  return (
    <div className="booking-result card">
      <h2 className="booking-result__heading heading-primary">Информация о записи</h2>
      <img className="booking-result__svg mt-8" src="/svg/appointment.svg" alt="Appointment image" />
      <span className="booking-result__label mt-6">Услуга:</span>
      <div className="booking-result__value mt-6">
        {service.title} {service.duration}
      </div>
      <span className="booking-result__label mt-2">Время:</span>
      <div className="booking-result__value mt-2">
        {date.getDay()} {displayDuration(time)}
      </div>
      <div className="booking-result__buttons mt-6">
        {/* {isLoading && <Spinner className="spinner--edge spinner--tiny" />} */}
        <button
          onClick={() =>
            setStep((state) => {
              if (state.lastStepName === 'service') {
                return { ...state, isResult: false, isService: true, step: state.step - 1 };
              }
              return { ...state, isResult: false, isTimetable: true, step: state.step - 1 };
            })
          }
          className={`btn btn--secondary btn--gray mr-4`}
          type="submit">
          Назад
        </button>
        <button
          disabled={isLoading}
          onClick={onSubmit}
          className={`btn btn--primary ${isLoading ? 'btn--submitted' : ''}`}
          type="submit">
          Записаться
        </button>
      </div>
    </div>
  );
};

export default BookingResult;
