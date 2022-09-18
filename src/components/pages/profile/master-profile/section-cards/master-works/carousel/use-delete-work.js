import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';
import { deleteWorkSuccess } from '../../../../../../../redux/work/actions';

const useDeleteWork = ({ state, goToGallery }) => {
  const [{ works }, { accessToken, id: profileId }] = useSelector((state) => [
    state.work,
    state.auth,
  ]);

  const { index } = state;

  const [asyncAction, isLoading] = useAsyncAction();

  const dispatch = useDispatch();

  const deleteWork = async () => {
    const config = {
      method: 'delete',
      url: `/master/${profileId}/work/${works[index]._id}`,
      accessToken,
    };

    const data = await asyncAction(config);

    if (data) {
      goToGallery();
      dispatch(deleteWorkSuccess({ deletedId: works[index]._id }));
    }
  };

  return [deleteWork, isLoading];
};

export default useDeleteWork;
