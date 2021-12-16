import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import { setAlert } from '../../../../redux/alert/actions';
import { deleteServicesUpdate } from '../../../../redux/service/actions/service';
import { unsetTimetableUpdate } from '../../../../redux/timetable/actions';

const useDeleteUpdate = () => {
  const [{ accessToken, id: profileId }, servicesState, { _id: timetableId }] = useSelector(
    (state) => [state.auth, state.services, state.timetable]
  );

  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const handleDeletion = async () => {
    const config = {
      method: 'delete',
      url: `/master/${profileId}/timetable/${timetableId}/update`,
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      const isServices = servicesState.services.length;
      const isMastersServices = servicesState.masterId === profileId;
      const needToDeleteUpdateFromServices = isServices && isMastersServices;

      if (needToDeleteUpdateFromServices) {
        dispatch(deleteServicesUpdate());
      }

      dispatch(unsetTimetableUpdate());
      dispatch(setAlert(alert));
    }
  };

  return [handleDeletion, isLoading];
};

export default useDeleteUpdate;
