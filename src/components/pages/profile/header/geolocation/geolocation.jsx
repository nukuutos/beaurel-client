import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import Maps from './maps';

const Geolocation = () => {
  const [isMaps, setIsMaps] = useState(false);
  const [{ placeOfWork, isPublicView, role, city }, { isPhone }] = useSelector((state) => [
    state.profile,
    state.screenSize,
  ]);

  const isMaster = role === 'master';

  return (
    <div className="profile__geolocation">
      <FontAwesomeIcon className="profile__map-marker" icon="map-marker-alt" />

      {isMaps && <Maps onClickClose={() => setIsMaps(false)} />}

      {isMaster ? placeOfWork : city}

      {!isPublicView && (
        <FontAwesomeIcon
          onClick={() => setIsMaps(true)}
          className={`profile__edit ${isPhone ? 'ml-3' : 'ml-4'}`}
          icon="pen"
        />
      )}
    </div>
  );
};
export default Geolocation;
