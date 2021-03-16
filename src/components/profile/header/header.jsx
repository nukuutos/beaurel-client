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
import AboutEdit from './about-edit';
import { useRouter } from 'next/router';

const Header = () => {
  const [{ isMaps, isEditAbout }, setState] = useState({ isMaps: false, isEditAbout: false });

  const [
    { firstName, lastName, ratingStats, specialization, placeOfwork, isPublicView, aboutText },
    { id: userId },
  ] = useSelector((state) => [state.profile, state.auth]);

  const router = useRouter();

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
          {isMaps && <Maps onClickClose={() => setState((state) => ({ ...state, isMaps: false }))} />}
          {placeOfwork}
          {!isPublicView && (
            <FontAwesomeIcon
              onClick={() => setState((state) => ({ ...state, isMaps: true }))}
              className="profile__edit ml-4"
              icon="pen"
            />
          )}
        </div>
        <p className="profile__about mt-2">
          {aboutText}
          {!isPublicView && (
            <FontAwesomeIcon
              onClick={() => setState((state) => ({ ...state, isEditAbout: true }))}
              className="profile__edit ml-4"
              icon="pen"
            />
          )}
        </p>
        {isEditAbout && <AboutEdit onClickClose={() => setState((state) => ({ ...state, isEditAbout: false }))} />}
      </div>

      {router.asPath !== '/' + userId && <StarProfile initialIsStarred />}
    </header>
  );
};

export default Header;
