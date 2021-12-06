import React from 'react';
import Cropper from 'react-cropper';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../../../base/modal';
import { setAlert } from '../../../../../redux/alert/actions';
import { updateAvatarSuccess } from '../../../../../redux/profile/actions';
import useAsyncAction from '../../../../../hooks/use-async-action/use-async-action';
import useCropper from './use-cropper';
import useMediaQuery from '../../../../../hooks/use-media-query';
import ModalHeading from '../../../../base/modal/modal-heading';

const EditAvatar = ({ setIsEdit }) => {
  const [{ avatar }, { accessToken, id: profileId }] = useSelector((state) => [
    state.profile,
    state.auth,
  ]);
  const isPhone = useMediaQuery(600);

  const [cropperProps, asyncCropperAction, handleFileUpload, isUploaded] = useCropper(avatar);
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
    <Modal isMobileBackground onClickClose={() => setIsEdit(false)}>
      <div className={`upload-avatar ${isPhone ? '' : 'card'}`}>
        {isLoading && <div className="spinner-with-background" />}
        <ModalHeading title="Фото профиля" onClickClose={() => setIsEdit(false)} />

        {avatar || isUploaded ? (
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
        ) : (
          <img src="/svg/add-avatar.svg" className="mt-2" alt="next" />
        )}

        {(avatar || isUploaded) && (
          <div className="upload-avatar__buttons">
            <button type="button" className={`btn btn--secondary btn--upload `}>
              Выбрать
              <input
                type="file"
                disabled={isLoading}
                onChange={(e) => handleFileUpload(e)}
                title="file-input"
                className="select__input"
              />
            </button>
            <button
              onClick={() => {
                asyncCropperAction(updateAvatar);
              }}
              type="submit"
              disabled={isLoading}
              className="btn btn--primary"
            >
              Сохранить
            </button>
          </div>
        )}

        {!avatar && !isUploaded && (
          <button type="button" className="mt-4 btn btn--primary btn--upload">
            Выбрать
            <input
              type="file"
              disabled={isLoading}
              onChange={(e) => handleFileUpload(e)}
              title=" "
              className="select__input"
            />
          </button>
        )}
      </div>
    </Modal>
  );
};

export default EditAvatar;
