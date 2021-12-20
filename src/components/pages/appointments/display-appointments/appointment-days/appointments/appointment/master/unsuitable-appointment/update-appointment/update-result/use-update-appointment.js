import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../../../../../hooks/use-async-action/use-async-action';
import { updateUnsuitableAppointment } from '../../../../../../../../../../../redux/appointments/actions';

const useUpdateAppointment = (appointment, setStep) => {
  const dispatch = useDispatch();
  const [{ date, time, service }, { accessToken, id: masterId }] = useSelector((state) => [
    state.appointments.booking.bookingAppointment,
    state.auth,
  ]);

  const [asyncAction, isLoading] = useAsyncAction();

  const { _id: appointmentId, date: prevDate } = appointment;

  const bookTime = async () => {
    const config = {
      method: 'put',
      url: `/master/${masterId}/appointment/${appointmentId}/unsuitable`,
      data: {
        duration: service.duration,
        time: { startAt: time, endAt: time + Number(service.duration) },
        date: date.format(),
      },
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      const stringDate = date.format('DD-MM-YYYY');
      dispatch(
        updateUnsuitableAppointment({
          appointmentId,
          duration: Number(service.duration),
          prevDate,
          date: stringDate,
          time: { startAt: time, endAt: time + service.duration },
        })
      );

      setStep(4);
    }
  };

  return [bookTime, isLoading];
};

export default useUpdateAppointment;
