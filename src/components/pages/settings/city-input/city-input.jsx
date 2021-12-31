import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import DisplayInput from '../utils/display-input';
import CitySearch from '../../../layout/city/city-search/city-search';

// standart case
const handleTimezone = (setCity, asyncAction) => {
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
      localStorage.setItem('city', data.city);
      localStorage.setItem('timezone', data.timezone);
      setCity(data.city);
    }
  };

  const onError = () => {
    localStorage.setItem('city', 'Хабаровск');
    localStorage.setItem('timezone', 'Asia/Vladivostok');
  };

  navigator.geolocation.getCurrentPosition(onSuccess, onError);
};

// standart case
const handleMasterTimezone = async (setCity, asyncAction, { accessToken, masterId }) => {
  const config = {
    method: 'get',
    url: `/master/${masterId}/timezone`,
    accessToken,
  };

  console.log('hehre');
  const data = await asyncAction(config);
  console.log(data);

  if (data) {
    localStorage.setItem('city', data.city);
    localStorage.setItem('timezone', data.timezone);
    setCity(data.city);
  } else {
    localStorage.setItem('city', 'Хабаровск');
    localStorage.setItem('timezone', 'Asia/Vladivostok');
  }
};

const CityInput = () => {
  const [isSearchCity, setIsSearchCity] = useState(false);
  const { role, accessToken, id: masterId } = useSelector((state) => state.auth);
  const [city, setCity] = useState('Хабаровск');
  const [asyncAction, isLoading] = useAsyncAction();

  useEffect(() => {
    const isCity = localStorage.getItem('city');

    if (role === 'master' && !isCity)
      handleMasterTimezone(setCity, asyncAction, { accessToken, masterId });
    else if (!isCity) handleTimezone(setCity, asyncAction);
    else setCity(isCity);
  }, []);

  return (
    <>
      {isSearchCity && <CitySearch onClickClose={() => setIsSearchCity(false)} setCity={setCity} />}
      <DisplayInput label="Город" data={city} setIsEdit={setIsSearchCity} />
    </>
  );
};

export default CityInput;
