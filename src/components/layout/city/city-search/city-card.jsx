import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCityAndTimezone } from '../../../../redux/timezone/actions';

const CityCard = ({ cityRef, cityData }) => {
  const { city: currentCity } = useSelector((state) => state.timezone);
  const dispatch = useDispatch();

  const { region, city } = cityData;

  const handleClick = () => dispatch(setCityAndTimezone(cityData));

  const activeClassName = currentCity === city ? 'city-search__city--active' : '';

  return (
    <div ref={cityRef} onClick={handleClick} className={`city-search__city ${activeClassName}`}>
      <span>{city}</span>
      <span className="city-search__region">{region}</span>
    </div>
  );
};

export default CityCard;
