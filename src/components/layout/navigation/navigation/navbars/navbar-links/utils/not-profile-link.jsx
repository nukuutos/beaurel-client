import Link from 'next/link';
import { useSelector } from 'react-redux';
import useGetClassName from './use-get-class-name';
import useHandleClick from './use-handle-click';

const NotProfileLink = ({ path, IconComponent, name }) => {
  const { isDesktop, isPhone } = useSelector((state) => state.screenSize);
  const className = useGetClassName(path);
  const handleClick = useHandleClick(path);

  return (
    <li onClick={handleClick} className={className}>
      <Link prefetch={false} href={path}>
        <a>
          {IconComponent} {(isDesktop || isPhone) && name}
        </a>
      </Link>
    </li>
  );
};

export default NotProfileLink;
