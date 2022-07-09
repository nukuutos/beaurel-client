import React from 'react';
import { useSelector } from 'react-redux';
import Geolocation from './geolocation/geolocation';
import useName from './use-name';

const Biography = ({ children }) => {
  const [{ specialization, role }, { isPhone }] = useSelector((state) => [
    state.profile,
    state.screenSize,
  ]);

  const profileName = useName();

  const isMaster = role === 'master';

  return (
    <div className="profile__biography ">
      <h1 className="profile__name">{profileName}</h1>
      {isMaster && <h2 className="profile__specialization">{specialization}</h2>}
      <Geolocation />
      {!isPhone && children}
    </div>
  );
};

export default Biography;
