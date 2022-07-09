import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import useAsyncAction from '../../../hooks/use-async-action/use-async-action';
import { signInSuccess } from '../../../redux/auth/actions';

const useOnSubmit = () => {
  const dispatch = useDispatch();
  const [asyncAction, isLoading] = useAsyncAction();
  const router = useRouter();

  const handleSubmit = async (data) => {
    const config = {
      method: 'post',
      url: `/auth/sign-in`,
      data,
      accessToken: null,
    };

    const responseData = await asyncAction(config);

    if (responseData) {
      const { id, accessToken, role, username } = responseData;
      dispatch(signInSuccess({ id, accessToken, role, username }));
      router.push('/[id]', `/${username || id}`);
    }
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
