import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import useGetProfileLinkClassName from './use-get-profile-class-name';
import useHandleClick from '../utils/use-handle-click';

const ProfileLink = ({ path, icon }) => {
  const className = useGetProfileLinkClassName(path);
  const handleClick = useHandleClick(path);

  return (
    <li onClick={handleClick} className={className} key={path[0]}>
      <Link href="/[id]" as={path[0]}>
        <a>
          <FontAwesomeIcon className="mobile-navbar__icon" icon={icon} />
        </a>
      </Link>
    </li>
  );
};

export default ProfileLink;
