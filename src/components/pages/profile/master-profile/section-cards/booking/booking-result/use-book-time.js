import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';
import { bookAppointment } from '../../../../../../../redux/slices/appointments';

const useBookTime = (state, goToSuccess) => {
  const dispatch = useDispatch();
  const [{ id: profileId }, { accessToken }] = useSelector((state) => [state.profile, state.auth]);

  const { date, time, service } = state;

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
        bookAppointment({
          date: stringDate,
          time: { startAt: time, endAt: time + service.duration },
        })
      );

      goToSuccess();
    }
  };

  return [bookTime, isLoading];
};

export default useBookTime;
