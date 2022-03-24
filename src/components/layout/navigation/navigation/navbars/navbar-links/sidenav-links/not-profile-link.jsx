import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import useGetClassName from './use-get-class-name';
import useHandleClick from '../utils/use-handle-click';

const NotProfileLink = ({ path, icon }) => {
  const className = useGetClassName(path);
  const handleClick = useHandleClick(path);

  return (
    <li onClick={handleClick} className={className} key={path}>
      <Link href={path}>
        <a>
          <FontAwesomeIcon className="mobile-navbar__icon" icon={icon} />
        </a>
      </Link>
    </li>
  );
};

export default NotProfileLink;
