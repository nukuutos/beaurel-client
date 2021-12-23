import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../hooks/use-async-action/use-async-action';
import { setAlert } from '../../../../../../redux/alert/actions';
import { addServiceParameterSuccess } from '../../../../../../redux/service/actions/service-parameter';

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
      const { ids, ...alert } = data;

      const subServicesToReducer = subServices.map(({ updateDuration, ...service }) => {
        const subService = { ...service };
        if (updateDuration) {
          subService.update = {
            status: 'suitable',
            duration: updateDuration,
            date: update.date.clone(),
          };
        }
        return subService;
      });

      const serviceParameter = { title, subServices: subServicesToReducer };

      dispatch(addServiceParameterSuccess({ ids, serviceParameter }));
      dispatch(setAlert(alert));
      resetForm();
      onClickClose();
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
