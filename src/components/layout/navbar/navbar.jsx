import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../../redux/auth/actions';

const renderNavigation = (links, userId = null) => {
  // check if links includes page name
  // true => ordinary map
  // else => profile link active ?
  // how to handle 404?

  const router = useRouter();

  if (links.some((link) => link.path === router.pathname)) {
    return links.map((link) => (
      <li className={`navbar__link ${router.pathname === link.path ? 'navbar__link--active' : ''}`} key={link.path}>
        <Link href={link.path === '/profile' ? userId : link.path}>
          <a>
            <FontAwesomeIcon className="navbar__icon" icon={link.icon} /> {link.name}
          </a>
        </Link>
      </li>
    ));
  }

  return links.map((link) => (
    <li className={`navbar__link ${link.path === '/profile' ? 'navbar__link--active' : ''}`} key={link.path}>
      <Link href={link.path === '/profile' ? userId : link.path}>
        <a>
          <FontAwesomeIcon className="navbar__icon" icon={link.icon} /> {link.name}
        </a>
      </Link>
    </li>
  ));
};

const Navbar = ({ links, isAuth }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);

  return (
    <nav className="navbar card ">
      {renderNavigation(links, id)}
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
