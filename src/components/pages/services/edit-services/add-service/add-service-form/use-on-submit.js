import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../hooks/use-async-action/use-async-action';
import { addService } from '../../../../../../redux/slices/service/service';

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
      const { id } = data;

      const serviceToReducer = { id, ...service };

      if (updateDuration) {
        serviceToReducer.update = {
          status: 'suitable',
          duration: updateDuration,
          date: dayjs(update.date).utc(true).clone(),
        };
      }

      dispatch(addService({ service: serviceToReducer }));
      resetForm();
      onClickClose();
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
