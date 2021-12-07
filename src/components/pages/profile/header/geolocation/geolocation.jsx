import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import Maps from './maps';
import useMediaQuery from '../../../../../hooks/use-media-query';

const Geolocation = () => {
  const [isMaps, setIsMaps] = useState(false);
  const [{ placeOfWork, isPublicView }] = useSelector((state) => [state.profile]);
  const isPhone = useMediaQuery(600);

  return (
    <div className="profile__geolocation">
      <FontAwesomeIcon className="profile__map-marker" icon="map-marker-alt" />

      {isMaps && <Maps onClickClose={() => setIsMaps(false)} />}

      {placeOfWork}

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
