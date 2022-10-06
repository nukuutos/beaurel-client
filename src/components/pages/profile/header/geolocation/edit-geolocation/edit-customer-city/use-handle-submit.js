import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';
import { updateProfileCity } from '../../../../../../../redux/slices/profile';
import { setCityAndTimezone } from '../../../../../../../redux/slices/timezone';

const useHandleSubmit = (closeModal) => {
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
      dispatch(updateProfileCity(values.city));
      dispatch(setCityAndTimezone({ ...values, timezone: null }));
      closeModal();
    }
  };

  return [handleSubmit, isLoading];
};

export default useHandleSubmit;
