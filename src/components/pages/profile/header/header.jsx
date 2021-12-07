import { useSelector } from 'react-redux';

import Avatar from './avatar/avatar';
import ProfileRating from './profile-rating';
import StarProfile from '../../../base/master-card/star-profile/star-profile';
import useMediaQuery from '../../../../hooks/use-media-query';
import About from './about/about';
import Geolocation from './geolocation/geolocation';

const Header = () => {
  const [{ firstName, lastName, ratingStats, specialization, id }, { id: userId }] = useSelector(
    (state) => [state.profile, state.auth]
  );

  const isPhone = useMediaQuery(600);

  const profileName = `${firstName} ${lastName[0]}.`;

  const isFavoriteIcon = userId && userId !== id;

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
      {isFavoriteIcon && <StarProfile masterId={id} />}
    </header>
  );
};

export default Header;
