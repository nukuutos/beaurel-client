import { useSelector } from 'react-redux';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';

const useOnSubmit = ({ onClickClose }) => {
  const { id: userId, accessToken } = useSelector((state) => state.auth);
  const [asyncAction, isLoading] = useAsyncAction();

  const handleSubmit = async (data) => {
    const config = {
      method: 'put',
      url: `/auth/${userId}/password`,
      data,
      accessToken,
    };

    const response = await asyncAction(config);

    if (response) {
      onClickClose();
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
