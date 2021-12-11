import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../../hooks/use-async-action/use-async-action';
import { setAlert } from '../../../../../../../../redux/alert/actions';
import { updateServiceParameterTitleSuccess } from '../../../../../../../../redux/service/actions/service-parameter';

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

    const alert = await asyncAction(config);

    if (alert) {
      dispatch(updateServiceParameterTitleSuccess(values));
      dispatch(setAlert(alert));
      setIsEdit(false);
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
