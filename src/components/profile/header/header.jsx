import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Avatar from './avatar';
// import InstagramEdit from '../instagram-edit';
import ProfileRating from './profile-rating';
import ButtonMarker from '../../utils/button-marker';
import StarProfile from './star-profile';
import PublicView from './public-view';
import Maps from './maps';

const Header = ({ publicView }) => {
  const [isMaps, setIsMaps] = useState(false);

  const { firstName, lastName, avatarImage, ratingStats, specialization, placeOfwork } = useSelector(
    (state) => state.profile
  );
  const [isPublicView, setIsPublicView] = publicView;

  return (
    <header className="profile__header">
      <Avatar image={avatarImage} className="profile__avatar" />
      {
        // instagramm to own component?
      }
      {/* {(isInstagram || !isPublicView) && (
        <FontAwesomeIcon
          className={`profile__instagram ${!isInstagram ? 'profile__instagram--inactive' : ''}`}
          icon={['fab', 'instagram']}
          onClick={() => setIsInstagramEdit(true)}
        />
      )}
      {isInstagramEdit && <InstagramEdit onClickClose={() => setIsInstagramEdit(false)} />} */}

      <ProfileRating ratingScore={ratingStats.avgRating} />

      <h1 className="profile__name">{firstName + ' ' + lastName[0] + '.'}</h1>
      <h2 className="profile__specialization">{specialization}</h2>

      {
        // instagramm to own component?
      }
      <div className="profile__geoposition">
        <FontAwesomeIcon className="profile__map-marker" icon="map-marker-alt" />
        {isMaps && <Maps onClickClose={() => setIsMaps(false)} />}
        {placeOfwork}
        {!isPublicView && <ButtonMarker onClick={() => setIsMaps(true)} />}
      </div>

      {isPublicView && <StarProfile initialIsStarred />}
      <PublicView isPublicView={isPublicView} setIsPublicView={setIsPublicView} />
    </header>
  );
};

export default Header;
