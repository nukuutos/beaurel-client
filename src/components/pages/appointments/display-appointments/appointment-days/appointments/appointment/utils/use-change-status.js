import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../../hooks/use-async-action/use-async-action';
import { setAlert } from '../../../../../../../../redux/alert/actions';
import { changeAppointmentStatus } from '../../../../../../../../redux/appointments/actions';

const useChangeStatus = ({ appointment, status, user }) => {
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [asyncAction, isLoading] = useAsyncAction();

  const { _id } = appointment;

  const handleChange = async () => {
    const config = {
      method: 'put',
      url: `/master/${profileId}/appointment/${_id}/status/${user}`,
      data: { status },
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      dispatch(changeAppointmentStatus({ nextStatus: status, appointment, user }));
      dispatch(setAlert(alert));
    }
  };

  return [handleChange, isLoading];
};

export default useChangeStatus;
