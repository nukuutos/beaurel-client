import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../hooks/use-async-action/use-async-action';
import { setAlert } from '../../../../../../redux/alert/actions';
import { addServiceParameterSuccess } from '../../../../../../redux/service/actions/service-parameter';

const useOnSubmit = (onClickClose) => {
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [asyncAction, isLoading] = useAsyncAction();

  const handleSubmit = async (values, { resetForm }) => {
    const config = {
      method: 'post',
      url: `/master/${profileId}/service-parameter`,
      data: { ...values },
      accessToken,
    };

    const data = await asyncAction(config);

    if (data) {
      const { ids, ...alert } = data;
      dispatch(addServiceParameterSuccess({ ids, serviceParameter: values }));
      dispatch(setAlert(alert));
      resetForm();
      onClickClose();
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
