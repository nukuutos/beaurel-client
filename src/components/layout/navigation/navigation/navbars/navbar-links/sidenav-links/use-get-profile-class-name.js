import { useRouter } from 'next/router';

const useGetProfileClassName = (linkPaths) => {
  const router = useRouter();
  const currentPath = router.asPath;
  const isCurrentPathProfile = linkPaths.includes(currentPath);

  let className = 'mobile-navbar__item';
  if (isCurrentPathProfile) className += ' mobile-navbar__item--active';

  return className;
};

export default useGetProfileClassName;
