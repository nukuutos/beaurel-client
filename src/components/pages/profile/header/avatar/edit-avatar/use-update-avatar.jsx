import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../hooks/use-async-action/use-async-action';
import { setAlert } from '../../../../../../redux/alert/actions';
import { updateAvatarSuccess } from '../../../../../../redux/profile/actions';

const useUpdateAvatar = (setIsEdit) => {
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

    if (data) {
      const { avatar, ...alert } = data;
      dispatch(updateAvatarSuccess({ avatar }));
      dispatch(setAlert(alert));
      setIsEdit(false);
    }
  };

  return [updateAvatar, isLoading];
};

export default useUpdateAvatar;
