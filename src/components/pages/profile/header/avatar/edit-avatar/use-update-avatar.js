import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../hooks/use-async-action/use-async-action';
import { updateAvatarSuccess } from '../../../../../../redux/profile/actions';

const useUpdateAvatar = (closeModal, editCounterRef) => {
  const { isAvatar } = useSelector((state) => state.profile);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const { accessToken, id: profileId } = useSelector((state) => state.auth);

  const updateAvatar = async (formData) => {
    const config = {
      method: 'put',
      url: `/profile/${profileId}/avatar`,
      data: formData,
      accessToken,
      addingHeaders: { 'Content-Type': `multipart/form-data`, Enctype: 'multipart/form-data' },
    };

    const data = await asyncAction(config);

    if (data && !isAvatar) {
      dispatch(updateAvatarSuccess());
    }

    editCounterRef.current++;

    closeModal();
  };

  return [updateAvatar, isLoading];
};

export default useUpdateAvatar;
