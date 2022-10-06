import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../../hooks/use-async-action/use-async-action';
import { updateSubService } from '../../../../../../../../redux/slices/service/service';

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

    const data = await asyncAction(config);

    if (data) {
      dispatch(updateSubService({ updatedSubService: { title, subOrder, ...values } }));
      setIsEdit(false);
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
