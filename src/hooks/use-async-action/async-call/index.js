import Axios from 'axios';
import handleUnauthorizedCall from './utils/handle-unauthorized-call';
import axios from '../../../utils/axios';

const asyncCall = async (dispatch, config) => {
  const { accessToken, addingHeaders, ...confingProps } = config;

  try {
    const { data } = await axios({
      ...confingProps,
      headers: {
        ...addingHeaders,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data || {};
  } catch (error) {
    if (Axios.isCancel(error)) {
      return null;
    }

    const { response } = error;

    // handle unauthorized error
    let data = null;
    if (response.status === 401) data = await handleUnauthorizedCall(dispatch, config);

    return data;
  }
};

export default asyncCall;
