import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';
import { setAlert } from '../../../../../../../redux/alert/actions';
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
    const alert = await asyncAction(config);
    if (alert) {
      dispatch(updateServiceSuccess({ updatedService: { ...values, id, order, subOrder } }));
      dispatch(setAlert(alert));
      setIsEdit(false);
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
