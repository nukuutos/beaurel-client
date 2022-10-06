import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import { deleteServicesUpdate } from '../../../../redux/slices/service/service';
import { unsetTimetableUpdate } from '../../../../redux/slices/timetable';

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

    const data = await asyncAction(config);

    if (data) {
      const isServices = servicesState.services.length;
      const isMastersServices = servicesState.masterId === profileId;
      const needToDeleteUpdateFromServices = isServices && isMastersServices;

      if (needToDeleteUpdateFromServices) {
        dispatch(deleteServicesUpdate());
      }

      dispatch(unsetTimetableUpdate());
    }
  };

  return [handleDeletion, isLoading];
};

export default useDeleteUpdate;
