import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import getClassName from './get-class-name';
import createSetTokenToCookie from '../utils/create-set-token-to-cookie';
import ProfileLink from '../utils/profile-link';
import NotProfileLink from '../utils/not-profile-link';
import getAuthLinks from './get-auth-links';

const useSidenav = () => {
  const { id: userId, accessToken } = useSelector((state) => state.auth);

  const setTokenToCookie = createSetTokenToCookie(accessToken);

  const router = useRouter();

  const links = getAuthLinks(userId);

  return links.map((link) => {
    const className = getClassName(router.asPath, link.path);

    const isProfileLink = link.path === `/${userId}`;

    return (
      <li onClick={setTokenToCookie} className={className} key={link.path}>
        {isProfileLink ? (
          <ProfileLink isTabView className="mobile-navbar__icon" {...link} />
        ) : (
          <NotProfileLink isTabView className="mobile-navbar__icon" {...link} />
        )}
      </li>
    );
  });
};

export default useSidenav;
