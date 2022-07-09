import NotProfileLink from './utils/not-profile-link';
import ProfileLink from './utils/profile-link';

const MainNavbarLinks = ({ links }) =>
  links.map((link) => {
    const isProfileLink = typeof link.path === 'object';
    return isProfileLink ? (
      <ProfileLink {...link} key={link.path[0]} />
    ) : (
      <NotProfileLink {...link} key={link.path} />
    );
  });

export default MainNavbarLinks;
