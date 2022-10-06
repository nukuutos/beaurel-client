import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../hooks/use-async-action/use-async-action';
import { addServiceParameter } from '../../../../../../redux/slices/service/service';

const useOnSubmit = (onClickClose) => {
  const [{ accessToken, id: profileId }, { update }] = useSelector((state) => [
    state.auth,
    state.timetable,
  ]);
  const dispatch = useDispatch();

  const [asyncAction, isLoading] = useAsyncAction();

  const handleSubmit = async (values, { resetForm }) => {
    const { title, subServices } = values;

    const subServicesToAPI = subServices.map(({ updateDuration, ...service }) => {
      const subService = { ...service };
      if (updateDuration) subService.updateDuration = updateDuration;
      return subService;
    });

    const config = {
      method: 'post',
      url: `/master/${profileId}/service-parameter`,
      data: { title, subServices: subServicesToAPI },
      accessToken,
    };

    const data = await asyncAction(config);

    if (data) {
      const { ids } = data;

      const subServicesToReducer = subServices.map(({ updateDuration, ...service }) => {
        const subService = { ...service };
        if (updateDuration) {
          subService.update = {
            status: 'suitable',
            duration: updateDuration,
            date: dayjs(update.date).utc(true).clone(),
          };
        }
        return subService;
      });

      const serviceParameter = { title, subServices: subServicesToReducer };

      dispatch(addServiceParameter({ ids, serviceParameter }));
      resetForm();
      onClickClose();
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
