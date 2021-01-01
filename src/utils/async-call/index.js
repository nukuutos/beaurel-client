import axios from '../axios';
import { setAlert } from '../../redux/alert/actions';
import handleUnauthorizedCall from './utils/handle-unauthorized-call';

// if success it return data
// else null
const asyncCall = async (dispatch, config) => {
  const { accessToken, addingHeaders, ...confingProps } = config;
  console.log({ Authorization: `Bearer ${accessToken}`, ...addingHeaders });

  try {
    const { data } = await axios({
      ...confingProps,
      headers: {
        ...addingHeaders,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    // handle unauthorized error
    if (error.response.status === 401) {
      const data = await handleUnauthorizedCall(dispatch, config); // get data or redirect

      // return data if we get it after recalling api
      if (data) return data;
    } else {
      dispatch(setAlert({ ...error.response.data }));
    }

    return null;
  }
};

export default asyncCall;
