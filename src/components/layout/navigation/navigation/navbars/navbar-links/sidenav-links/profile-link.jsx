import Link from 'next/link';
import useGetProfileLinkClassName from './use-get-profile-class-name';
import useHandleClick from '../utils/use-handle-click';

const ProfileLink = ({ path, IconComponent }) => {
  const className = useGetProfileLinkClassName(path);
  const handleClick = useHandleClick(path);

  return (
    <li onClick={handleClick} className={className}>
      <Link prefetch={false} href="/[id]" as={path[0]}>
        <a>{IconComponent}</a>
      </Link>
    </li>
  );
};

export default ProfileLink;
