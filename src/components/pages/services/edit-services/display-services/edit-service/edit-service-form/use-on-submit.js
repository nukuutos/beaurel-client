import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';
import { updateServiceSuccess } from '../../../../../../../redux/service/actions/service';

const useOnSubmit = (service, setIsEdit) => {
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const { id, order, subOrder } = service;

  const handleSubmit = async (values) => {
    const config = {
      method: 'put',
      url: `/master/${profileId}/service/${id}`,
      data: { ...values },
      accessToken,
    };

    const data = await asyncAction(config);

    if (data) {
      dispatch(updateServiceSuccess({ updatedService: { ...values, id, order, subOrder } }));
      setIsEdit(false);
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
