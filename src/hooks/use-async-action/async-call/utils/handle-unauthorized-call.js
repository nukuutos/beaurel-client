import Router from 'next/router';
import { refreshTokenSuccess } from '../../../../redux/slices/auth';
import axios from '../../../../utils/axios';

const handleUnauthorizedCall = async (dispatch, config) => {
  const { accessToken, ...confingProps } = config;

  try {
    const {
      data: { accessToken, role },
    } = await axios.post('/auth/refresh-token');

    dispatch(refreshTokenSuccess({ accessToken, role }));

    const { data } = await axios({
      ...confingProps,
      headers: {
        [process.env.NEXT_PUBLIC_AUTH_HEADER]: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    return Router.push('/sign-in');
  }
};

export default handleUnauthorizedCall;
