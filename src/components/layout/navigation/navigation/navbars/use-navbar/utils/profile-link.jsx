import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const ProfileLink = ({ className, path, icon, name, isTabView }) => (
  <Link href="/[id]" as={path}>
    <a>
      <FontAwesomeIcon className={className} icon={icon} /> {!isTabView && name}
    </a>
  </Link>
);

export default ProfileLink;
