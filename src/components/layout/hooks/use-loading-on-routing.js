import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const useLoadingOnRouting = () => {
  const [{ isLoading }, { isDesktop }] = useSelector((state) => [state.routing, state.screenSize]);
  const router = useRouter();
  const isPageLoading = (!isDesktop || router.pathname === '/sign-in') && isLoading;
  return isPageLoading;
};

export default useLoadingOnRouting;
