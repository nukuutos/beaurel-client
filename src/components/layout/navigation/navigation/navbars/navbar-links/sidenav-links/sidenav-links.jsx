import ProfileLink from './profile-link';
import NotProfileLink from './not-profile-link';
import useLinks from './use-links';

const SidenavLinks = () => {
  const links = useLinks();

  return links.map((link) => {
    const isProfileLink = typeof link.path === 'object';

    return isProfileLink ? (
      <ProfileLink isTabView className="mobile-navbar__icon" {...link} />
    ) : (
      <NotProfileLink isTabView className="mobile-navbar__icon" {...link} />
    );
  });
};

export default SidenavLinks;
