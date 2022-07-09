import { useSelector } from 'react-redux';
import Modal from '../../../../../base/modal/modal';
import ModalHeading from '../../../../../base/modal/modal-heading';
import useUpdateAvatar from './use-update-avatar';
import useFileUpload from '../../../../../../hooks/use-file-upload';
import AvatarCropper from './avatar-cropper/avatar-cropper';
import NoAvatar from './no-avatar';

const EditAvatar = ({ closeModal, editCounterRef }) => {
  const [{ isAvatar, id: userId }, { isPhone }] = useSelector((state) => [
    state.profile,
    state.screenSize,
  ]);
  const [updateAvatar, isLoading] = useUpdateAvatar(closeModal, editCounterRef);

  const { src, isUploaded, handleFileUpload } = useFileUpload(
    `https://storage.yandexcloud.net/${process.env.NEXT_PUBLIC_S3_BUCKET}/${userId}/avatar.webp`
  );

  const isUserImage = isAvatar || isUploaded;

  return (
    <Modal onClickClose={closeModal}>
      <div className={`upload-avatar ${isPhone ? '' : 'card'}`}>
        {isLoading && <div className="spinner-with-background" />}
        <ModalHeading title="Фото профиля" onClickClose={closeModal} />

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
