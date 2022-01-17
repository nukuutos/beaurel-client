import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import { getFavorites } from '../../../../redux/favorites/actions';

const useGetFavoriteMasters = () => {
  const { id: profileId, accessToken } = useSelector((state) => state.auth);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  useEffect(() => {
    const getFavoriteMasters = async () => {
      const config = {
        method: 'get',
        url: `/profile/${profileId}/favorite`,
        accessToken,
      };

      const { data } = await asyncAction(config);

      if (data) dispatch(getFavorites(data.masters));
    };

    getFavoriteMasters();
  }, [accessToken, asyncAction, dispatch, profileId]);

  return isLoading;
};

export default useGetFavoriteMasters;
