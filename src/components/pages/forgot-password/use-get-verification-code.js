import useAsyncAction from '../../../hooks/use-async-action/use-async-action';

const useGetVerificationCode = ({ phone, goToNextStep }) => {
  const [asyncAction, isLoading] = useAsyncAction();

  const getVerificationCode = async () => {
    const phoneValue = `+7${phone}`;

    const config = {
      method: 'post',
      url: `/auth/password/code`,
      data: { phone: phoneValue },
      accessToken: null,
    };

    const response = await asyncAction(config);

    if (response) goToNextStep();
  };

  return [getVerificationCode, isLoading];
};

export default useGetVerificationCode;
