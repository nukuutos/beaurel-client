import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Avatar from './avatar/avatar';
// import InstagramEdit from '../instagram-edit';
import ProfileRating from './profile-rating';
import ButtonMarker from '../../utils/button-marker';
import StarProfile from './star-profile';
import PublicView from './public-view';
import Maps from './maps';

const Header = () => {
  const [isMaps, setIsMaps] = useState(false);

  const { firstName, lastName, ratingStats, specialization, placeOfwork, isPublicView } = useSelector(
    (state) => state.profile
  );

  return (
    <header className="profile__header">
      <Avatar className="profile__avatar" />

      <ProfileRating ratingScore={ratingStats.avgRating} />

      <h1 className="profile__name">{firstName + ' ' + lastName[0] + '.'}</h1>
      <h2 className="profile__specialization">{specialization}</h2>

      <div className="profile__geoposition">
        <FontAwesomeIcon className="profile__map-marker" icon="map-marker-alt" />
        {isMaps && <Maps onClickClose={() => setIsMaps(false)} />}
        {placeOfwork}
        {!isPublicView && <ButtonMarker onClick={() => setIsMaps(true)} />}
      </div>

      {isPublicView && <StarProfile initialIsStarred />}
      <PublicView />
    </header>
  );
};

export default Header;
