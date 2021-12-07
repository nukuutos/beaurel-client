import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const NotProfileLink = ({ className, isTabView, path, icon, name }) => (
  <Link href={path}>
    <a>
      <FontAwesomeIcon className={className} icon={icon} /> {!isTabView && name}
    </a>
  </Link>
);

export default NotProfileLink;
