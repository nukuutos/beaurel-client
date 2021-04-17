import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { signOut } from '../../../redux/auth/actions';

const renderNavigation = (links) => {
  const { id: userId, accessToken } = useSelector((state) => state.auth);

  const setAccessTokenToCookie = () => {
    Cookies.set('accessToken', accessToken);
  };

  const onClick = accessToken ? setAccessTokenToCookie : null;
  // how to handle 404?

  const router = useRouter();

  return links.map((link) => {
    return (
      <li
        onClick={onClick}
        className={`navbar__link ${router.asPath === link.path ? 'navbar__link--active' : ''}`}
        key={link.path}>
        {link.path === `/${userId}` ? (
          <>
            <Link href={`/[id]`} as={link.path}>
              <a>
                <FontAwesomeIcon className="navbar__icon" icon={link.icon} /> {link.name}
              </a>
            </Link>
          </>
        ) : (
          <Link href={link.path}>
            <a>
              <FontAwesomeIcon className="navbar__icon" icon={link.icon} /> {link.name}
            </a>
          </Link>
        )}
      </li>
    );
  });
};

const Navbar = ({ links, isAuth }) => {
  const dispatch = useDispatch();
  // const { id, accessToken } = useSelector((state) => state.auth);

  return (
    <nav className="navbar card card--layout">
      {renderNavigation(links)}
      {isAuth && (
        <li className="navbar__link">
          <Link href="/">
            <a onClick={() => dispatch(signOut())}>
              <FontAwesomeIcon className="navbar__icon" icon="door-open" /> Выход
            </a>
          </Link>
        </li>
      )}
    </nav>
  );
};

export default Navbar;
