import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../hooks/use-async-action/use-async-action';
import { addMaster, deleteMaster } from '../../../../../redux/profile/actions';

const useStarProfile = () => {
  const [asyncAction] = useAsyncAction();
  const [{ id: masterId }, { id: userId, accessToken }] = useSelector((state) => [
    state.profile,
    state.auth,
  ]);

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

  return [addFavorite, deleteFavorite];
};

export default useStarProfile;
