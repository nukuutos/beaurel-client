import React from 'react';
import Modal from '../../../utils/modal';
import Cropper from 'react-cropper';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../../../../redux/alert/actions';
import { updateAvatarSuccess } from '../../../../redux/profile/actions';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import useCropper from './use-cropper';

const EditAvatar = ({ setIsEdit }) => {
  const [{ avatar }, { accessToken, id: profileId }] = useSelector((state) => [state.profile, state.auth]);

  const [cropperProps, asyncCropperAction, handleFileUpload] = useCropper(avatar);
  const [asyncAction, isLoading] = useAsyncAction();

  const dispatch = useDispatch();

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

  return (
    <Modal onClickClose={() => setIsEdit(false)}>
      <div className="upload-avatar card">
        <Cropper
          {...cropperProps}
          className="upload-avatar__uploaded-image"
          initialAspectRatio={1 / 1}
          aspectRatio={1 / 1}
          guides={false}
          background={false}
          minCropBoxHeight={70}
          minCropBoxWidth={70}
          zoomable={false}
          movable={false}
        />

        <div className="upload-avatar__buttons mt-9">
          <div className={`btn btn--secondary btn--upload  ${isLoading ? 'btn--disabled' : ''} mr-4`}>
            Выбрать
            <input
              type="file"
              disabled={isLoading}
              onChange={(e) => handleFileUpload(e)}
              title=" "
              className="select__input"
            />
          </div>
          <button
            onClick={() => {
              asyncCropperAction(updateAvatar);
            }}
            type="submit"
            disabled={isLoading}
            className={`btn btn--primary ${isLoading ? 'btn--submitted btn--spinner' : ''}`}>
            Сохранить
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditAvatar;
