import Router from 'next/router';
import { refreshTokenSuccess } from '../../../../redux/auth/actions';
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
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    return Router.push('/sign-in');
  }
};

export default handleUnauthorizedCall;
