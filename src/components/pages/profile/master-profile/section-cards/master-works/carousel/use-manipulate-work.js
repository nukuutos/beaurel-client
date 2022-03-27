import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';
import { deleteWorkSuccess } from '../../../../../../../redux/work/actions';

const useManipulateWork = (state, setIsDeleting) => {
  const [{ index }, setState] = state;

  const [asyncAction, isLoadingOnDelete, isCancelled] = useAsyncAction();
  const [{ works }, { accessToken, id: profileId }] = useSelector((state) => [
    state.work,
    state.auth,
  ]);

  const dispatch = useDispatch();

  const deleteWork = async () => {
    const config = {
      method: 'delete',
      url: `/master/${profileId}/work/${works[index]._id}`,
      accessToken,
    };

    const data = await asyncAction(config);

    setIsDeleting(true);

    if (data) {
      setState((state) => ({ ...state, display: 'works' }));
      dispatch(deleteWorkSuccess({ deletedId: works[index]._id }));
    }

    if (!isCancelled.current) setIsDeleting(false);
  };

  const editWork = () => setState((state) => ({ ...state, display: 'edit' }));

  return [deleteWork, editWork, isLoadingOnDelete];
};

export default useManipulateWork;
