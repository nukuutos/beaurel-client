import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';

const useResendCode = (phone) => {
  const [asyncAction] = useAsyncAction();

  const resendCode = async () => {
    const phoneValue = `+7${phone}`;

    const config = {
      method: 'post',
      url: `/auth/sign-up/code`,
      data: { phone: phoneValue },
      accessToken: null,
    };

    await asyncAction(config);
  };

  return resendCode;
};

export default useResendCode;
