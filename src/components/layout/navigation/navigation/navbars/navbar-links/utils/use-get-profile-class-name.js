import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const useGetProfileLinkClassName = (linkPaths) => {
  const [{ isLoading, url }, { isDesktop }] = useSelector((state) => [
    state.routing,
    state.screenSize,
  ]);

  const router = useRouter();
  const currentPath = router.asPath;
  const isCurrentPathProfile = linkPaths.includes(currentPath);
  const isProfileLoading = isDesktop && isLoading && linkPaths.includes(url);

  let className = 'navbar__link';
  if (isCurrentPathProfile) className += ' navbar__link--active';
  if (isProfileLoading) className += ' navbar__link--loading';

  return className;
};

export default useGetProfileLinkClassName;
