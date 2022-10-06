import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../../hooks/use-async-action/use-async-action';
import { deleteSubService } from '../../../../../../../../redux/slices/service/service';

const useSubServiceDelete = ({ subService, title, order }) => {
  const [asyncAction, isLoading] = useAsyncAction();
  const { accessToken, id: profileId } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { id, subOrder } = subService;

  const deleteSubService = async () => {
    const config = {
      method: 'delete',
      url: `/master/${profileId}/service-parameter/${title}/sub-service/${id}`,
      accessToken,
    };

    const data = await asyncAction(config);

    if (data) {
      dispatch(deleteSubService({ id, title, subOrder, order }));
    }
  };

  return [deleteSubService, isLoading];
};

export default useSubServiceDelete;
