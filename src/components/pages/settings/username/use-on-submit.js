import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import { setAlert } from '../../../../redux/alert/actions';
import { setAuthData } from '../../../../redux/auth/actions';

const useOnSubmit = (setIsEdit) => {
  const { id: profileId, accessToken } = useSelector((state) => state.auth);
  const [asyncCall, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const config = {
      method: 'put',
      url: `/profile/${profileId}/username`,
      data: values,
      accessToken,
    };

    const alert = await asyncCall(config);

    if (alert) {
      dispatch(setAuthData(values));
      dispatch(setAlert(alert));
      setIsEdit(false);
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
