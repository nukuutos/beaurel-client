import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../../hooks/use-async-action/use-async-action';
import { setAlert } from '../../../../../../../../redux/alert/actions';
import { deleteServiceParameterSuccess } from '../../../../../../../../redux/service/actions/service-parameter';

const useDeleteService = (title) => {
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const deleteService = async (e) => {
    e.stopPropagation();

    const config = {
      method: 'delete',
      url: `/master/${profileId}/service-parameter/${title}`,
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      dispatch(deleteServiceParameterSuccess({ title }));
      dispatch(setAlert(alert));
    }
  };

  return [deleteService, isLoading];
};

export default useDeleteService;
