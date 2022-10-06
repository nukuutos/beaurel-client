import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../../hooks/use-async-action/use-async-action';
import { updateServiceParameterTitle } from '../../../../../../../../redux/slices/service/service';

const useOnSubmit = (setIsEdit) => {
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const { oldTitle } = values;

    const config = {
      method: 'put',
      url: `/master/${profileId}/service-parameter/${oldTitle}`,
      data: values,
      accessToken,
    };

    const data = await asyncAction(config);

    if (data) {
      dispatch(updateServiceParameterTitle(values));
      setIsEdit(false);
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
