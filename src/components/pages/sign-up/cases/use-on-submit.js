import { useSelector } from 'react-redux';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';

const useOnSubmit = ({ phone, setIsVerification, disableProgressBar }) => {
  const { city } = useSelector((state) => state.timezone);
  const [asyncAction, isLoading] = useAsyncAction();

  const handleSubmit = async (values) => {
    const phoneValue = `+7${values.phone}`;

    const config = {
      method: 'post',
      url: `/auth/sign-up`,
      data: { ...values, phone: phoneValue, city },
      accessToken: null,
    };

    const response = await asyncAction(config);

    if (response !== null) {
      phone.current = values.phone;
      setIsVerification(true);
      disableProgressBar();
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
