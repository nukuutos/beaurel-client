import { useSelector } from 'react-redux';

import Avatar from './avatar/avatar';
import ProfileRating from './profile-rating';
import StarProfile from '../../../base/master-card/star-profile/star-profile';
import About from './about/about';
import Geolocation from './geolocation/geolocation';
import EditButton from './about/edit-button';

const Header = () => {
  const [
    { aboutText, firstName, lastName, ratingStats, specialization, id, role },
    { id: userId },
    { isPhone },
  ] = useSelector((state) => [state.profile, state.auth, state.screenSize]);
  const profileName = `${firstName} ${lastName[0]}.`;
  const isFavoriteIcon = userId && userId !== id;
  const masterData = { firstName, lastName, ratingStats, specialization, _id: id };
  const isMaster = role === 'master';

  return (
    <header className="profile__header">
      <div className="profile__identify">
        <Avatar />
        {isMaster && <ProfileRating ratingScore={ratingStats.avgRating} />}
      </div>
      <div className="profile__biography ">
        <h1 className="profile__name">{profileName}</h1>
        {isMaster && <h2 className="profile__specialization">{specialization}</h2>}
        <Geolocation />
        {!isPhone && !isFavoriteIcon && <About />}
        {!isPhone && isFavoriteIcon && (
          <button type="button" className="profile__about-btn btn btn--secondary ">
            Написать
          </button>
        )}
      </div>
      {((aboutText && isFavoriteIcon) || (!isFavoriteIcon && isPhone)) && <About />}
      {isPhone && isFavoriteIcon && (
        <button type="button" className="profile__about-btn btn btn--secondary ">
          Написать
        </button>
      )}
      {isFavoriteIcon && <StarProfile masterData={masterData} />}
    </header>
  );
};

export default Header;
