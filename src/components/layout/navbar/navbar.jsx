import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../redux/auth/actions';

const Navbar = ({ links, isAuth }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <nav className="navbar card ">
      {links.map((link) => (
        <li className={`navbar__link ${router.pathname === link.path ? 'navbar__link--active' : ''}`} key={link.path}>
          <Link href={link.path}>
            <a>
              <FontAwesomeIcon className="navbar__icon" icon={link.icon} /> {link.name}
            </a>
          </Link>
        </li>
      ))}
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
