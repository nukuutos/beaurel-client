import { useState } from 'react';

const useFileUpload = (initialSrc) => {
  const [{ src, isUploaded, file }, setState] = useState({
    src: initialSrc,
    isUploaded: false,
    file: null,
  });

  const handleFileUpload = (event) => {
    const reader = new FileReader();
    const uploadedFile = event.target.files[0];

    reader.onloadend = () => {
      setState({ src: reader.result, isUploaded: true, file: uploadedFile });
    };

    if (uploadedFile) reader.readAsDataURL(uploadedFile);
  };

  return { src, isUploaded, handleFileUpload, file };
};

export default useFileUpload;
