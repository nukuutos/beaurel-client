import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAsyncAction from './use-async-action/use-async-action';

const useUpdateStatus = () => {
  const { id: profileId, accessToken } = useSelector((state) => state.auth);
  const [asyncAction, isLoading] = useAsyncAction();
  const router = useRouter();

  useEffect(() => {
    const updateStatus = async () => {
      const config = {
        method: 'put',
        url: `/profile/${profileId}/online`,
        accessToken,
      };

      asyncAction(config);
    };

    if (accessToken && profileId) updateStatus();
  }, [router.pathname, profileId, accessToken, asyncAction]);

  return isLoading;
};

export default useUpdateStatus;
