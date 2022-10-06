import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../../../hooks/use-async-action/use-async-action';
import { upsertAppointmentReview } from '../../../../../../../../../redux/slices/appointments';

const useOnSubmit = (appointment, onClickClose) => {
  const { accessToken } = useSelector((state) => state.auth);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const { review, masterId, date, _id: appointmentId } = appointment;

  const method = review ? 'put' : 'post';

  const handleSubmit = async (values) => {
    const config = {
      method,
      url: `master/${masterId}/appointment/${appointmentId}/review/`,
      data: values,
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      dispatch(
        upsertAppointmentReview({
          appointmentId,
          review: { ...values },
          stringDate: dayjs(date).utc(true).format('DD-MM-YYYY'),
        })
      );
      onClickClose();
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
