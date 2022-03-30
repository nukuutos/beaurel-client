import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../../hooks/use-async-action/use-async-action';
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

    const data = await asyncAction(config);

    if (data) {
      dispatch(deleteServiceParameterSuccess({ title }));
    }
  };

  return [deleteService, isLoading];
};

export default useDeleteService;
