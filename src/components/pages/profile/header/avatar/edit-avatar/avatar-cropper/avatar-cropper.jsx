import Cropper from 'react-cropper';
import UpdateButtons from './update-buttons';
import useCropper from './use-cropper';

const AvatarCropper = ({ updateAvatar, isLoading, onUpload, src }) => {
  const [cropperProps, asyncCropperAction] = useCropper(src);
  const onSubmit = () => asyncCropperAction(updateAvatar);

  return (
    <>
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
      <UpdateButtons isLoading={isLoading} onSubmit={onSubmit} onUpload={onUpload} />
    </>
  );
};

export default AvatarCropper;
