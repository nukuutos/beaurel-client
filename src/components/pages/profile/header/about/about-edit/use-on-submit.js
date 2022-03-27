import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../hooks/use-async-action/use-async-action';
import { updateAboutSuccess } from '../../../../../../redux/profile/actions';

const useOnSubmit = (onClickClose) => {
  const dispatch = useDispatch();
  const [{ id, accessToken }] = useSelector((state) => [state.auth]);
  const [asyncAction] = useAsyncAction();

  const onSubmit = async (values) => {
    const config = {
      method: 'patch',
      url: `/profile/${id}`,
      data: values,
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      dispatch(updateAboutSuccess(values.aboutText.trim()));
      onClickClose();
    }
  };

  return [onSubmit];
};

export default useOnSubmit;
