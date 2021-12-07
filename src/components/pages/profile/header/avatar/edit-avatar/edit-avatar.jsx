import React from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../../../../base/modal';
import useMediaQuery from '../../../../../../hooks/use-media-query';
import ModalHeading from '../../../../../base/modal/modal-heading';
import useUpdateAvatar from './use-update-avatar';
import useFileUpload from '../../../../../../hooks/use-file-upload';
import AvatarCropper from './avatar-cropper/avatar-cropper';
import NoAvatar from './no-avatar';

const EditAvatar = ({ setIsEdit }) => {
  const { avatar } = useSelector((state) => state.profile);
  const isPhone = useMediaQuery(600);
  const [updateAvatar, isLoading] = useUpdateAvatar(setIsEdit);
  const { src, isUploaded, handleFileUpload } = useFileUpload(`http://localhost:5000/${avatar}`);

  const isUserImage = avatar || isUploaded;

  return (
    <Modal isMobileBackground onClickClose={() => setIsEdit(false)}>
      <div className={`upload-avatar ${isPhone ? '' : 'card'}`}>
        {isLoading && <div className="spinner-with-background" />}
        <ModalHeading title="Фото профиля" onClickClose={() => setIsEdit(false)} />

        {isUserImage ? (
          <AvatarCropper
            isLoading={isLoading}
            onUpload={handleFileUpload}
            updateAvatar={updateAvatar}
            src={src}
          />
        ) : (
          <NoAvatar isLoading={isLoading} onUpload={handleFileUpload} />
        )}
      </div>
    </Modal>
  );
};

export default EditAvatar;
