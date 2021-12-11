import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';
import { setAlert } from '../../../../../../../redux/alert/actions';
import { deleteServiceSuccess } from '../../../../../../../redux/service/actions/service';

const useDeleteService = (service) => {
  const [asyncAction, isLoading] = useAsyncAction();
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { id, order } = service;

  const deleteService = async () => {
    const config = {
      method: 'delete',
      url: `/master/${profileId}/service/${id}`,
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      dispatch(deleteServiceSuccess({ serviceId: id, order }));
      dispatch(setAlert(alert));
    }
  };

  return [deleteService, isLoading];
};

export default useDeleteService;
