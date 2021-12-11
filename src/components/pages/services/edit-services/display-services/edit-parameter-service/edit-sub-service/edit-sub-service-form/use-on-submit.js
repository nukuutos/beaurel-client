import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../../hooks/use-async-action/use-async-action';
import { setAlert } from '../../../../../../../../redux/alert/actions';
import { updateSubServiceSuccess } from '../../../../../../../../redux/service/actions/service-parameter';

const useOnSubmit = ({ subService, title, setIsEdit }) => {
  const dispatch = useDispatch();
  const { id, subOrder } = subService;
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const [asyncAction, isLoading] = useAsyncAction();

  const handleSubmit = async (values) => {
    const config = {
      method: 'put',
      url: `/master/${profileId}/service-parameter/${title}/sub-service/${id}`,
      data: values,
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      dispatch(updateSubServiceSuccess({ updatedSubService: { title, subOrder, ...values } }));
      dispatch(setAlert(alert));
      setIsEdit(false);
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
