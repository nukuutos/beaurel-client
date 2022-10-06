import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import { servicesToUnsuitable } from '../../../../redux/slices/service/service';
import { setTimetableUpdate } from '../../../../redux/slices/timetable';

const useOnSubmit = ({ closeModal, needToUpdateServices }) => {
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
      const { unsuitableServices } = responseData;

      const isServices = servicesState.services.length;
      const isMasterServices = servicesState.masterId === profileId; // in redux state
      const needToUnsuitable = isServices && isMasterServices && unsuitableServices;

      // services to unsuitable
      if (needToUnsuitable) {
        const { date, sessionTime } = values;
        dispatch(servicesToUnsuitable({ date, sessionTime }));
      }

      if (unsuitableServices) {
        needToUpdateServices(unsuitableServices);
      } else {
        closeModal();
      }

      dispatch(setTimetableUpdate({ update }));
      resetForm();
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
