import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import useGetClassName from './use-get-class-name';
import useHandleClick from './use-handle-click';

const NotProfileLink = ({ path, icon, name }) => {
  const { isDesktop, isPhone } = useSelector((state) => state.screenSize);
  const className = useGetClassName(path);
  const handleClick = useHandleClick(path);

  return (
    <li onClick={handleClick} className={className} key={path}>
      <Link href={path}>
        <a>
          <FontAwesomeIcon className="navbar__icon" icon={icon} /> {(isDesktop || isPhone) && name}
        </a>
      </Link>
    </li>
  );
};

export default NotProfileLink;
