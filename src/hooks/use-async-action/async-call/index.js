import Axios from 'axios';
import handleUnauthorizedCall from './utils/handle-unauthorized-call';
import axios from '../../../utils/axios';
import { addAlert } from '../../../redux/alerts/actions';

const asyncCall = async (dispatch, config) => {
  const { accessToken, addingHeaders, ...configProps } = config;

  try {
    const { data } = await axios({
      ...configProps,
      headers: {
        ...addingHeaders,
        [process.env.NEXT_PUBLIC_AUTH_HEADER]: `Bearer ${accessToken}`,
      },
    });

    return data || {};
  } catch (error) {
    if (Axios.isCancel(error)) {
      return null;
    }

    const { response } = error;

    let data = null;

    if (!response) {
      dispatch(addAlert({ message: 'Ошибка подключения!' }));
    } else if (response.status === 401) {
      data = await handleUnauthorizedCall(dispatch, config);
    } else {
      const message = response.data?.message || 'Что-то пошло не так!';
      dispatch(addAlert({ message }));
    }

    return data;
  }
};

export default asyncCall;
