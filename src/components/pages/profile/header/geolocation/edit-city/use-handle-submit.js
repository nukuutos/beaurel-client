import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../hooks/use-async-action/use-async-action';
import { setCityAndTimezone } from '../../../../../../redux/timezone/actions';

const useHandleSubmit = () => {
  const { id: userId, accessToken } = useSelector((state) => state.auth);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const config = {
      method: 'patch',
      url: `/profile/${userId}`,
      data: values,
      accessToken,
    };

    const data = await asyncAction(config);

    if (data) {
      dispatch(setCityAndTimezone({ ...values, timezone: null }));
    }
  };

  return [handleSubmit, isLoading];
};

export default useHandleSubmit;
