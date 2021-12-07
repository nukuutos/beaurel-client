import { useState, useRef } from 'react';

const useCropper = (src) => {
  const [cropper, setCropper] = useState(null);
  const cropperRef = useRef(null);

  const cropperProps = {
    src,
    cropperRef,
    onInitialized: (instance) => setCropper(instance),
  };

  const asyncCropperAction = (asyncAction) => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('image', blob);
        await asyncAction(formData);
      }, 'image/jpeg');
    }
  };

  return [cropperProps, asyncCropperAction];
};

export default useCropper;
