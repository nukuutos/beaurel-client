import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import { setAlert } from '../../../../redux/alert/actions';
import { servicesToUnsuitable } from '../../../../redux/service/actions/service';
import { setTimetableUpdate } from '../../../../redux/timetable/actions';

const getHandleState = (unsuitableServices) => (state) => {
  if (!unsuitableServices) return { ...state, isVisible: false };

  const toUnsuitableServicesModal = {
    ...state,
    step: 1,
    servicesCountToUpdate: unsuitableServices,
  };

  return toUnsuitableServicesModal;
};

const useOnSubmit = (setUpdateTimetable) => {
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();
  const [timetable, servicesState, { accessToken, id: profileId }] = useSelector((state) => [
    state.timetable,
    state.services,
    state.auth,
  ]);

  const handleSubmit = async (data, { resetForm }) => {
    const { edit, manually, ...values } = data;

    const update = {
      manually: { appointments: manually.appointments },
      ...values,
    };

    const config = {
      method: 'post',
      url: `/master/${profileId}/timetable/${timetable._id}/update`,
      data: update,
      accessToken,
    };

    const responseData = await asyncAction(config);

    if (responseData) {
      const { unsuitableServices, ...alert } = responseData;

      const isServices = servicesState.services.length;
      const isMasterServices = servicesState.masterId === profileId; // in redux state
      const needToUnsuitable = isServices && isMasterServices && unsuitableServices;

      // services to unsuitable
      if (needToUnsuitable) {
        const { date, sessionTime } = values;
        dispatch(servicesToUnsuitable({ date, sessionTime }));
      }

      const handleState = getHandleState(unsuitableServices);

      setUpdateTimetable(handleState);
      dispatch(setTimetableUpdate({ update }));
      dispatch(setAlert(alert));
      resetForm();
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
