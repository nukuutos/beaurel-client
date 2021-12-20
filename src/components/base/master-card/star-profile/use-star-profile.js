import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import { addFavorite, deleteFavorite } from '../../../../redux/favorites/actions';

const useStarProfile = (masterId) => {
  const [asyncAction, isLoading] = useAsyncAction();
  const [favorites, { id: userId, accessToken }] = useSelector((state) => [
    state.favorites,
    state.auth,
  ]);

  const isFavorite = favorites.includes(masterId);

  const dispatch = useDispatch();

  const addMaster = async (e) => {
    e.stopPropagation();

    const config = {
      method: 'post',
      url: `/profile/${userId}/favorite/${masterId}`,
      accessToken,
    };

    dispatch(addFavorite({ newMasterId: masterId }));
    await asyncAction(config);
  };

  const deleteMaster = async (e) => {
    e.stopPropagation();

    const config = {
      method: 'delete',
      url: `/profile/${userId}/favorite/${masterId}`,
      accessToken,
    };

    dispatch(deleteFavorite({ deletedMasterId: masterId }));
    await asyncAction(config);
  };

  const handleClick = (e) => {
    if (isLoading) return e.stopPropagation();
    return isFavorite ? deleteMaster(e) : addMaster(e);
  };

  return [handleClick, isFavorite];
};

export default useStarProfile;
