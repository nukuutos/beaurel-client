import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Avatar from './avatar/avatar';
import ProfileRating from './profile-rating';
import StarProfile from './star-profile';
import Maps from './maps';
import useMediaQuery from '../../../../hooks/use-media-query';
import About from './about/about';

const Header = () => {
  const [{ isMaps }, setState] = useState({ isMaps: false, isEditAbout: false });

  const [
    { firstName, lastName, ratingStats, specialization, placeOfWork, isPublicView },
    { id: userId },
  ] = useSelector((state) => [state.profile, state.auth]);

  const router = useRouter();

  const isPhone = useMediaQuery(600);

  const profileName = `${firstName} ${lastName[0]}.`;

  return (
    <header className="profile__header">
      <div className="profile__identify">
        <Avatar className="profile__avatar" />
        <ProfileRating ratingScore={ratingStats.avgRating} />
      </div>
      <div className="profile__biography ">
        <h1 className="profile__name">{profileName}</h1>
        <h2 className="profile__specialization">{specialization}</h2>
        <div className="profile__geolocation">
          <FontAwesomeIcon className="profile__map-marker" icon="map-marker-alt" />

          {isMaps && (
            <Maps onClickClose={() => setState((state) => ({ ...state, isMaps: false }))} />
          )}

          {placeOfWork}

          {!isPublicView && (
            <FontAwesomeIcon
              onClick={() => setState((state) => ({ ...state, isMaps: true }))}
              className={`profile__edit ${isPhone ? 'ml-3' : 'ml-4'}`}
              icon="pen"
            />
          )}
        </div>

        {!isPhone && <About />}
      </div>

      {isPhone && <About />}

      {router.asPath !== `/${userId}` && <StarProfile />}
    </header>
  );
};

export default Header;
