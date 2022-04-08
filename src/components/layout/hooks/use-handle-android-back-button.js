import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useHandleAndroidBackButton = () => {
  const { close } = useSelector((state) => state.modal);
  const router = useRouter();

  useEffect(() => {
    router.beforePopState((state) => {
      if (!close) return true;
      close();
      history.pushState(state, '');
      router.replace(router.pathname, router.asPath, { shallow: true });
      return false;
    });
  }, [router, close]);
};

export default useHandleAndroidBackButton;
