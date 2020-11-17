import axios from '../axios';
import { setAlert } from '../../redux/alert/actions';
import handleUnauthorizedCall from './utils/handle-unauthorized-call';

const asyncCall = async (dispatch, config) => {
  const { accessToken, ...confingProps } = config;

  try {
    const { data } = await axios({
      ...confingProps,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    // handle unauthorized error
    if (error.response.status === 401) {
      const { data } = await handleUnauthorizedCall(dispatch, config); // get data or redirect
      // return data if we get it
      if (data) return data;
    } else {
      dispatch(setAlert({ ...error.response.data }));
    }

    return null;
  }
};

export default asyncCall;
