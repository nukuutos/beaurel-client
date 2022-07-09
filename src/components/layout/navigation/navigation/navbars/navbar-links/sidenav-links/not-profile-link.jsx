import Link from 'next/link';
import useGetClassName from './use-get-class-name';
import useHandleClick from '../utils/use-handle-click';

const NotProfileLink = ({ path, IconComponent }) => {
  const className = useGetClassName(path);
  const handleClick = useHandleClick(path);

  return (
    <li onClick={handleClick} className={className}>
      <Link prefetch={false} href={path}>
        <a>{IconComponent}</a>
      </Link>
    </li>
  );
};

export default NotProfileLink;
