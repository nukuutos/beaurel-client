import { useState, useRef } from "react";

const useCropper = (avatar) => {
  const [{ cropper, src, isUploaded }, setState] = useState({ cropper: null, src: `http://localhost:5000/${avatar}` });
  const cropperRef = useRef(null);

  const cropperProps = {
    src,
    cropperRef,
    onInitialized: (instance) => setState((state) => ({ ...state, cropper: instance })),
  };

  const handleFileUpload = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      setState((state) => ({ ...state, src: reader.result, isUploaded: true }));
    };

    if (file) reader.readAsDataURL(file);
  };

  const asyncCropperAction = (asyncBody) => {
    cropper.getCroppedCanvas().toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("image", blob);

      await asyncBody(formData);
    }, "image/jpeg");
  };

  return [cropperProps, asyncCropperAction, handleFileUpload, isUploaded];
};

export default useCropper;
