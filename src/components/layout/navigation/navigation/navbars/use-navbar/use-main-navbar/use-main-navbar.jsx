import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import getClassName from './get-class-name';
import createSetTokenToCookie from '../utils/create-set-token-to-cookie';
import ProfileLink from '../utils/profile-link';
import NotProfileLink from '../utils/not-profile-link';

const useMainNavbar = (links, isTabView = false) => {
  const { id: userId, accessToken } = useSelector((state) => state.auth);

  const setTokenToCookie = createSetTokenToCookie(accessToken);

  const router = useRouter();

  return links.map((link) => {
    const className = getClassName(router.asPath, link.path);

    const isProfileLink = link.path === `/${userId}`;

    return (
      <li onClick={setTokenToCookie} className={className} key={link.path}>
        {isProfileLink ? (
          <ProfileLink className="navbar__icon" isTabView={isTabView} {...link} />
        ) : (
          <NotProfileLink className="navbar__icon" isTabView={isTabView} {...link} />
        )}
      </li>
    );
  });
};

export default useMainNavbar;
