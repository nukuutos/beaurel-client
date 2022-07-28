import { useSelector } from 'react-redux';
import About from './about/about';
import MessageButton from './message-button';
import StarProfile from '../../../base/master-card/star-profile/star-profile';
import Identity from './identity';
import Biography from './biography';

const SomebodyHeader = () => {
  const [{ aboutText }, { id: userId }, { isPhone }] = useSelector((state) => [
    state.profile,
    state.auth,
    state.screenSize,
  ]);

  return (
    <>
      <header className="profile__header">
        <Identity />
        <Biography>
          <MessageButton />
        </Biography>

        {aboutText && <About />}
        {isPhone && <MessageButton />}
        {userId && <StarProfile />}
      </header>
      <div className="profile__horizontal-line" />
    </>
  );
};

export default SomebodyHeader;
