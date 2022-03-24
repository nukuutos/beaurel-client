import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import useGetProfileLinkClassName from './use-get-profile-class-name';
import useHandleClick from './use-handle-click';

const ProfileLink = ({ path, icon, name }) => {
  const { isDesktop, isPhone } = useSelector((state) => state.screenSize);
  const className = useGetProfileLinkClassName(path);
  const handleClick = useHandleClick(path);

  return (
    <li onClick={handleClick} className={className} key={path[0]}>
      <Link href="/[id]" as={path[0]}>
        <a>
          <FontAwesomeIcon className="navbar__icon" icon={icon} /> {(isDesktop || isPhone) && name}
        </a>
      </Link>
    </li>
  );
};

export default ProfileLink;
