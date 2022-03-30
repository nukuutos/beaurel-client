import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';
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

    const data = await asyncAction(config);

    if (data) {
      dispatch(deleteServiceSuccess({ serviceId: id, order }));
    }
  };

  return [deleteService, isLoading];
};

export default useDeleteService;
