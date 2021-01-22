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
    <header className="profile__header mt-6">
      <div className="profile__identify">
        <Avatar className="profile__avatar" />
        <ProfileRating className="mt-4" ratingScore={ratingStats.avgRating} />
      </div>
      <div className="profile__biography ">
        <h1 className="profile__name mt-2">{firstName + ' ' + lastName[0] + '.'}</h1>
        <h2 className="profile__specialization mt-2">{specialization}</h2>
        <div className="profile__geoposition mt-2">
          <FontAwesomeIcon className="profile__map-marker" icon="map-marker-alt" />
          {isMaps && <Maps onClickClose={() => setIsMaps(false)} />}
          {placeOfwork}
          {/* {!isPublicView && <ButtonMarker onClick={() => setIsMaps(true)} />} */}
        </div>
        <p className="profile__about mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus
          magna fringilla urna, porttitor rhoncus do
        </p>
      </div>

      <StarProfile initialIsStarred />

      {/* {isPublicView && <StarProfile initialIsStarred />}
      <PublicView /> */}
    </header>
  );
};

export default Header;
