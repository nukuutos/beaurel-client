import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Avatar from './avatar/avatar';
import ProfileRating from './profile-rating';
import StarProfile from './star-profile/star-profile';
import useMediaQuery from '../../../../hooks/use-media-query';
import About from './about/about';
import Geolocation from './geolocation/geolocation';

const Header = () => {
  const [{ firstName, lastName, ratingStats, specialization }, { id: userId }] = useSelector(
    (state) => [state.profile, state.auth]
  );

  const router = useRouter();

  const isPhone = useMediaQuery(600);

  const profileName = `${firstName} ${lastName[0]}.`;

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
      {router.asPath !== `/${userId}` && <StarProfile />}
    </header>
  );
};

export default Header;
