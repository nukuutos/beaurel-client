import Link from 'next/link';
import { useSelector } from 'react-redux';
import useGetProfileLinkClassName from './use-get-profile-class-name';
import useHandleClick from './use-handle-click';

const ProfileLink = ({ path, IconComponent, name }) => {
  const { isDesktop, isPhone } = useSelector((state) => state.screenSize);
  const className = useGetProfileLinkClassName(path);
  const handleClick = useHandleClick(path);

  return (
    <li onClick={handleClick} className={className}>
      <Link prefetch={false} href="/[id]" as={path[0]}>
        <a>
          {IconComponent} {(isDesktop || isPhone) && name}
        </a>
      </Link>
    </li>
  );
};

export default ProfileLink;
