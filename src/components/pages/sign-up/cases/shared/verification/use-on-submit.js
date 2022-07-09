import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import useAsyncAction from '../../../../../../hooks/use-async-action/use-async-action';
import { signInSuccess } from '../../../../../../redux/auth/actions';

const useOnSubmit = (phone) => {
  const dispatch = useDispatch();
  const [asyncAction, isLoading] = useAsyncAction();
  const router = useRouter();

  const handleSubmit = async (values) => {
    const { first, second, third, fourth } = values;
    const code = `${first}${second}${third}${fourth}`.toUpperCase();
    const phoneValue = `+7${phone}`;

    const config = {
      method: 'post',
      url: `/auth/sign-up/confirmation`,
      data: { code, phone: phoneValue },
      accessToken: null,
    };

    const data = await asyncAction(config);

    if (data) {
      const { id, accessToken, role, username } = data;
      dispatch(signInSuccess({ id, accessToken, role, username }));
      router.push('/[id]', `/${id}`);
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
