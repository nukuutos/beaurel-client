import useAsyncAction from '../../../hooks/use-async-action/use-async-action';

const useOnSubmit = (goToNextStep) => {
  const [asyncAction, isLoading] = useAsyncAction();

  const handleSubmit = async (values) => {
    const { code, phone, newPassword, newConfirmedPassword } = values;
    const { first, second, third, fourth } = code;
    const formattedCode = `${first}${second}${third}${fourth}`.toUpperCase();
    const phoneValue = `+7${phone}`;

    const config = {
      method: 'put',
      url: `/auth/password`,
      data: { code: formattedCode, phone: phoneValue, newPassword, newConfirmedPassword },
      accessToken: null,
    };

    const data = await asyncAction(config);

    if (data) goToNextStep();
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
