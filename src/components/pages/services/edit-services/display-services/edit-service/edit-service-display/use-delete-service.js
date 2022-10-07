import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';
import { deleteService } from '../../../../../../../redux/slices/service/service';

const useDeleteService = (service) => {
  const [asyncAction, isLoading] = useAsyncAction();
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { id, order } = service;

  const deleteServiceCall = async () => {
    const config = {
      method: 'delete',
      url: `/master/${profileId}/service/${id}`,
      accessToken,
    };

    const data = await asyncAction(config);

    if (data) {
      dispatch(deleteService({ serviceId: id, order }));
    }
  };

  return [deleteServiceCall, isLoading];
};

export default useDeleteService;
