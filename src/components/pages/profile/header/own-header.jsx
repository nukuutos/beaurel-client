import React from 'react';
import { useSelector } from 'react-redux';
import About from './about/about';
import Avatar from './avatar/avatar';
import Geolocation from './geolocation/geolocation';
import ProfileRating from './profile-rating';
import useName from './use-name';

const OwnHeader = () => {
  const [{ specialization, role }, { isPhone }] = useSelector((state) => [
    state.profile,
    state.screenSize,
  ]);

  const profileName = useName();
  const isMaster = role === 'master';

  return (
    <header className="profile__header">
      <div className="profile__identify">
        <Avatar />
        {isMaster && <ProfileRating />}
      </div>
      <div className="profile__biography ">
        <h1 className="profile__name">{profileName}</h1>
        {isMaster && <h2 className="profile__specialization">{specialization}</h2>}
        <Geolocation />
        {!isPhone && <About />}
      </div>
      {isPhone && <About />}
    </header>
  );
};

export default OwnHeader;
