import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../hooks/use-async-action/use-async-action';
import { setAlert } from '../../../../../../redux/alert/actions';
import { addServiceSuccess } from '../../../../../../redux/service/actions/service';

const useOnSubmit = (onClickClose) => {
  const [{ accessToken, id: profileId }, { update }] = useSelector((state) => [
    state.auth,
    state.timetable,
  ]);
  const dispatch = useDispatch();

  const [asyncAction, isLoading] = useAsyncAction();

  const handleSubmit = async (values, { resetForm }) => {
    const { updateDuration, ...service } = values;

    const dataToAPI = { ...service };
    if (updateDuration) dataToAPI.updateDuration = updateDuration;

    const config = {
      method: 'post',
      url: `/master/${profileId}/service`,
      data: dataToAPI,
      accessToken,
    };

    const data = await asyncAction(config);

    if (data) {
      const { id, ...alert } = data;

      const serviceToReducer = { id, ...service };

      if (updateDuration) {
        serviceToReducer.update = {
          status: 'suitable',
          duration: updateDuration,
          date: update.date.clone(),
        };
      }

      dispatch(addServiceSuccess({ service: serviceToReducer }));
      dispatch(setAlert(alert));
      resetForm();
      onClickClose();
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
