import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changePageFinish, changePageStart } from '../../../redux/slices/routing';

const useHandleRouting = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      dispatch(changePageStart(url));
    };

    const handleRouteChangeComplete = () => {
      dispatch(changePageFinish());
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useHandleRouting;
