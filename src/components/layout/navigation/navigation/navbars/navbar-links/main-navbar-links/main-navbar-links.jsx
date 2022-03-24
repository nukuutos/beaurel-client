import NotProfileLink from '../utils/not-profile-link';
import ProfileLink from '../utils/profile-link';

const MainNavbarLinks = ({ links }) =>
  links.map((link) => {
    const isProfileLink = typeof link.path === 'object';
    return isProfileLink ? <ProfileLink {...link} /> : <NotProfileLink {...link} />;
  });

export default MainNavbarLinks;
