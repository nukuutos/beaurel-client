import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCityAndTimezone } from '../redux/timezone/actions';
import useAsyncAction from './use-async-action/use-async-action';

const handlePublicCase = (setCity, asyncAction) => {
  const onSuccess = async (pos) => {
    const { latitude: lat, longitude: lng } = pos.coords;

    const config = {
      method: 'get',
      url: `/timezone`,
      params: { lat, lng },
      accessToken: null,
    };

    const data = await asyncAction(config);

    if (data) {
      setCity(data);
    }
  };

  const onError = () => {
    setCity({ city: 'Хабаровск', timezone: 'Asia/Vladivostok' });
  };

  navigator.geolocation.getCurrentPosition(onSuccess, onError);
};

// master case => to auth case
const handleAuthCase = async (setCity, asyncAction, { accessToken, userId }) => {
  const config = {
    method: 'get',
    url: `/profile/${userId}/city`,
    accessToken,
  };

  const data = await asyncAction(config);

  if (data) {
    setCity(data);
  } else {
    setCity({ city: 'Хабаровск', timezone: 'Asia/Vladivostok' });
  }
};

const useDetectTimezone = () => {
  const { accessToken, id: userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [asyncAction, isLoading] = useAsyncAction();

  const setCity = useCallback((data) => dispatch(setCityAndTimezone(data)), [dispatch]);

  useEffect(() => {
    if (userId) {
      handleAuthCase(setCity, asyncAction, { accessToken, userId });
    } else {
      handlePublicCase(setCity, asyncAction);
    }
  }, [setCity, asyncAction, accessToken, userId]);

  return isLoading;
};

export default useDetectTimezone;
