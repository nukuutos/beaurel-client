import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAsyncAction from "../../../hooks/use-async-action/use-async-action";
import { useSelector } from "react-redux";
import CitySearch from "./city-search/city-search";
import useMediaQuery from "../../../hooks/use-media-query";

// standart case
const handleTimezone = (setCity, asyncAction) => {
  const onSuccess = async (pos) => {
    const { latitude: lat, longitude: lng } = pos.coords;

    const config = {
      method: "get",
      url: `/timezone`,
      params: { lat, lng },
      accessToken: null,
    };

    const data = await asyncAction(config);

    if (data) {
      localStorage.setItem("city", data.city);
      localStorage.setItem("timezone", data.timezone);
      setCity(data.city);
    }
  };

  const onError = () => {
    localStorage.setItem("city", "Хабаровск");
    localStorage.setItem("timezone", "Asia/Vladivostok");
  };

  navigator.geolocation.getCurrentPosition(onSuccess, onError);
};

// standart case
const handleMasterTimezone = async (setCity, asyncAction, { accessToken, masterId }) => {
  const config = {
    method: "get",
    url: `/master/${masterId}/timezone`,
    accessToken,
  };

  const data = await asyncAction(config);

  if (data) {
    localStorage.setItem("city", data.city);
    localStorage.setItem("timezone", data.timezone);
    setCity(data.city);
  } else {
    localStorage.setItem("city", "Хабаровск");
    localStorage.setItem("timezone", "Asia/Vladivostok");
  }
};

const City = () => {
  const [isSearchCity, setIsSearchCity] = useState(false);
  const { role, accessToken, id: masterId } = useSelector((state) => state.auth);
  const [city, setCity] = useState("Хабаровск");
  const [asyncAction, isLoading] = useAsyncAction();
  const isMaxWidth = useMediaQuery(1200);

  useEffect(() => {
    const isCity = localStorage.getItem("city");

    if (role === "master" && !isCity) handleMasterTimezone(setCity, asyncAction, { accessToken, masterId });
    else if (!isCity) handleTimezone(setCity, asyncAction);
    else setCity(isCity);
  }, []);

  return (
    <>
      <div onClick={() => setIsSearchCity(true)} className={`city ${!isMaxWidth && "mt-6"} card`}>
        <FontAwesomeIcon className={`city__icon ${!isMaxWidth && "mr-6"}`} icon="crosshairs" /> {!isMaxWidth && city}
      </div>
      {isSearchCity && <CitySearch onClickClose={() => setIsSearchCity(false)} setCity={setCity} />}
    </>
  );
};

export default City;
