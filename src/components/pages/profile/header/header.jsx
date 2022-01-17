import { useSelector } from 'react-redux';

import Avatar from './avatar/avatar';
import ProfileRating from './profile-rating';
import StarProfile from '../../../base/master-card/star-profile/star-profile';
import About from './about/about';
import Geolocation from './geolocation/geolocation';

const Header = () => {
  const [{ firstName, lastName, ratingStats, specialization, id }, { id: userId }, { isPhone }] =
    useSelector((state) => [state.profile, state.auth, state.screenSize]);

  const profileName = `${firstName} ${lastName[0]}.`;

  const isFavoriteIcon = userId && userId !== id;

  const masterData = { firstName, lastName, ratingStats, specialization, _id: id };

  return (
    <header className="profile__header">
      <div className="profile__identify">
        <Avatar />
        <ProfileRating ratingScore={ratingStats.avgRating} />
      </div>
      <div className="profile__biography ">
        <h1 className="profile__name">{profileName}</h1>
        <h2 className="profile__specialization">{specialization}</h2>
        <Geolocation />
        {!isPhone && <About />}
      </div>
      {isPhone && <About />}
      {isFavoriteIcon && <StarProfile masterData={masterData} />}
    </header>
  );
};

export default Header;
