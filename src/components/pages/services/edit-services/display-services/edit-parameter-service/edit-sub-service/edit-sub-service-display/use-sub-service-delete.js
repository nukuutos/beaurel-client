import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../../hooks/use-async-action/use-async-action';
import { setAlert } from '../../../../../../../../redux/alert/actions';
import { deleteSubServiceSuccess } from '../../../../../../../../redux/service/actions/service-parameter';

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

    const alert = await asyncAction(config);

    if (alert) {
      dispatch(deleteSubServiceSuccess({ id, title, subOrder, order }));
      dispatch(setAlert(alert));
    }
  };

  return [deleteSubService, isLoading];
};

export default useSubServiceDelete;
