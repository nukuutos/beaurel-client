import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import { setAuthData } from '../../../../redux/auth/actions';

const useOnSubmit = (setIsEdit) => {
  const { id: profileId, accessToken } = useSelector((state) => state.auth);
  const [asyncCall, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const config = {
      method: 'patch',
      url: `/profile/${profileId}`,
      data: values,
      accessToken,
    };

    const data = await asyncCall(config);

    if (data) {
      dispatch(setAuthData(values));
      setIsEdit(false);
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
