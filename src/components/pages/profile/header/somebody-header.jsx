import { useSelector } from 'react-redux';
import ProfileRating from './profile-rating';
import Geolocation from './geolocation/geolocation';
import Avatar from './avatar/avatar';
import About from './about/about';
import MessageButton from './message-button';
import StarProfile from '../../../base/master-card/star-profile/star-profile';
import useName from './use-name';

const SomebodyHeader = () => {
  const [{ aboutText, specialization, role }, { id: userId }, { isPhone }] = useSelector(
    (state) => [state.profile, state.auth, state.screenSize]
  );

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
        {!isPhone && <MessageButton />}
      </div>
      {aboutText && <About />}
      {isPhone && <MessageButton />}
      {userId && <StarProfile />}
    </header>
  );
};

export default SomebodyHeader;
