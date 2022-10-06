import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';
import { deleteWork } from '../../../../../../../redux/slices/work';

const useDeleteWork = ({ state, goToGallery }) => {
  const [{ works }, { accessToken, id: profileId }] = useSelector((state) => [
    state.work,
    state.auth,
  ]);

  const { index } = state;

  const [asyncAction, isLoading] = useAsyncAction();

  const dispatch = useDispatch();

  const deleteAction = async () => {
    const config = {
      method: 'delete',
      url: `/master/${profileId}/work/${works[index]._id}`,
      accessToken,
    };

    const data = await asyncAction(config);

    if (data) {
      goToGallery();
      dispatch(deleteWork({ deletedId: works[index]._id }));
    }
  };

  return [deleteAction, isLoading];
};

export default useDeleteWork;
