import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import displayDuration from '../services/utils/display-duration';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import {
  unsetAppointmentService,
  unsetAppointmentDate,
  bookAppointmentSuccess,
} from '../../../../redux/appointments/actions';
import convertDateToString from './booking-timetable/utils/convert-date-to-string';
import { MONTHS } from './booking-timetable/utils/week';

const BookingResult = ({ setStep }) => {
  const [{ date, time, service }, { accessToken, id: profileId }] = useSelector((state) => [
    state.appointments.booking.bookingAppointment,
    state.auth,
  ]);

  const dispatch = useDispatch();
  const [asyncAction, isLoading] = useAsyncAction();

  const bookTime = async () => {
    const config = {
      method: 'post',
      url: `/profile/${profileId}/appointment`,
      data: {
        serviceId: service.id,
        time: { startAt: time, endAt: time + service.duration },
        date: date,
      },
      accessToken, // ?
    };

    const alert = await asyncAction(config);

    if (alert) {
      // add this appointment to booking appointments this
      const stringDate = convertDateToString(date);
      dispatch(bookAppointmentSuccess({ date: stringDate, time: { startAt: time, endAt: time + service.duration } }));

      setStep((state) => {
        return { ...state, isResult: false, isSuccess: true, step: state.step + 1 };
      });
    }
  };

  return (
    <div className="booking-result card">
      <h2 className="booking-result__heading heading">Информация о записи</h2>
      <img className="booking-result__svg mt-8" src="/svg/appointment.svg" alt="Appointment image" />
      <span className="booking-result__label mt-6">Услуга:</span>
      <div className="booking-result__value mt-6">
        {service.title} {displayDuration(service.duration)}
      </div>
      <span className="booking-result__label mt-2">Время:</span>
      <div className="booking-result__value mt-2">
        {date.getDate()} {MONTHS[date.getMonth()].toLowerCase()} {date.getFullYear()} в {displayDuration(time)}
      </div>
      <div className="booking-result__buttons mt-6">
        <button
          onClick={() =>
            setStep((state) => {
              if (state.lastStepName === 'service') {
                dispatch(unsetAppointmentService());
                return { ...state, isResult: false, isService: true, step: state.step - 1 };
              }
              // timetable case
              dispatch(unsetAppointmentDate());
              return { ...state, isResult: false, isTimetable: true, step: state.step - 1 };
            })
          }
          className={`btn btn--secondary ${isLoading ? 'btn--disabled' : ''} btn--gray mr-4`}
          type="submit">
          Назад
        </button>
        <button
          disabled={isLoading}
          onClick={bookTime}
          className={`btn btn--primary ${isLoading ? 'btn--spinner btn--submitted' : ''}`}
          type="submit">
          Записаться
        </button>
      </div>
    </div>
  );
};

export default BookingResult;
