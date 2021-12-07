import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import { addMaster, deleteMaster } from '../../../../redux/profile/actions';

const useStarProfile = (masterId) => {
  const [asyncAction, isLoading] = useAsyncAction();
  const [{ masters }, { id: userId, accessToken }] = useSelector((state) => [
    state.profile,
    state.auth,
  ]);

  const isFavorite = masters.includes(masterId);

  const dispatch = useDispatch();

  const addFavorite = async (e) => {
    e.stopPropagation();

    const config = {
      method: 'post',
      url: `/profile/${userId}/favorite/${masterId}`,
      accessToken,
    };

    dispatch(addMaster({ newMasterId: masterId }));
    await asyncAction(config);
  };

  const deleteFavorite = async (e) => {
    e.stopPropagation();

    const config = {
      method: 'delete',
      url: `/profile/${userId}/favorite/${masterId}`,
      accessToken,
    };

    dispatch(deleteMaster({ deletedMasterId: masterId }));
    await asyncAction(config);
  };

  const handleClick = (e) => {
    if (isLoading) return e.stopPropagation();
    return isFavorite ? deleteFavorite(e) : addFavorite(e);
  };

  return [handleClick, isFavorite];
};

export default useStarProfile;
