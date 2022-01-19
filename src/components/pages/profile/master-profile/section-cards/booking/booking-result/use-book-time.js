import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';
import { bookAppointmentSuccess } from '../../../../../../../redux/appointments/actions';

const useBookTime = (setStep) => {
  const dispatch = useDispatch();
  const [{ id: profileId }, { date, time, service }, { accessToken }] = useSelector((state) => [
    state.profile,
    state.appointments.booking.bookingAppointment,
    state.auth,
  ]);

  const [asyncAction, isLoading] = useAsyncAction();

  const bookTime = async () => {
    const config = {
      method: 'post',
      url: `/master/${profileId}/appointment`,
      data: {
        serviceId: service.id,
        time: { startAt: time, endAt: time + service.duration },
        date: date.format(),
      },
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      // add this appointment to booking appointments this
      const stringDate = date.format('DD-MM-YYYY');
      dispatch(
        bookAppointmentSuccess({
          date: stringDate,
          time: { startAt: time, endAt: time + service.duration },
        })
      );

      setStep((state) => ({ ...state, isResult: false, isSuccess: true, step: state.step + 1 }));
    }
  };

  return [bookTime, isLoading];
};

export default useBookTime;
