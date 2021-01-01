import React, { useState, useRef, useEffect } from 'react';
import Modal from '../../../utils/modal';
import Cropper from 'react-cropper';
// import 'cropperjs/dist/cropper.css';
import Spinner from '../../../utils/spinner';
import asyncCall from '../../../../utils/async-call';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../../../../redux/alert/actions';
import { updateAvatarSuccess } from '../../../../redux/profile/actions';

const EditAvatar = ({ setIsEdit }) => {
  const { avatar, id } = useSelector((state) => state.profile);
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useSelector((state) => state.auth); // add avatar
  const isCancelled = useRef(false);
  const dispatch = useDispatch();
  // get avatar from redux
  const [cropper, setCropper] = useState(null);
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState(`http://localhost:5000/${avatar}`);

  const handleFileUpload = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    setFile(file);

    reader.onloadend = () => {
      setSrc(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const cropperRef = useRef(null);

  const onCrop = () => {
    // const imageElement = cropperRef.current;
    // const cropper = imageElement.cropper;
    // setCanvas(cropper.getCroppedCanvas());
  };

  const updateAvatar = () => {
    // await canvas;

    setIsLoading(true);
    cropper.getCroppedCanvas().toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('image', blob);

      const config = {
        method: 'put',
        url: `/profile/${id}/avatar`,
        data: formData,
        accessToken,
        addingHeaders: { 'Content-Type': `multipart/form-data`, Enctype: 'multipart/form-data' },
      };

      const data = await asyncCall(dispatch, config);
      if (data) {
        const { avatar, ...alert } = data;
        dispatch(updateAvatarSuccess({ avatar }));
        dispatch(setAlert(alert));
        // resetForm();
        // setIsAddWork(false);
      }

      if (!isCancelled.current) setIsLoading(false);
    }, 'image/jpeg');
  };

  useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  return (
    <Modal onClickClose={() => setIsEdit(false)}>
      <div className="master-works master-works--add">
        <Cropper
          src={src}
          // style={{ height: 400, width: '100%' }}
          className="mt-s-6 master-works__image--add"
          // Cropper.js options
          initialAspectRatio={1 / 1}
          aspectRatio={1 / 1}
          guides={false}
          background={false}
          // crop={onCrop}
          ref={cropperRef}
          // modal={false} // hz
          // highlight={false}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          minCropBoxHeight={70}
          minCropBoxWidth={70}
          zoomable={false}
          movable={false}
        />

        {/* <img src={src} alt="Uploaded image" className="mt-s-6 master-works__image--add" /> */}

        <div className="select gc-f mt-s-6 mb-s-2">
          {isLoading && <Spinner className="spinner--edge spinner--tiny" />}
          <button className={`btn btn--secondary btn--mini`}>Select Image</button>
          <input type="file" onChange={(e) => handleFileUpload(e)} className="select__input" />
          {/* <button disabled={isSubmitting} type="submit" className="btn btn--secondary btn--mini btn--success ml-s-6"> */}
          <button
            onClick={() => {
              updateAvatar();
            }}
            type="submit"
            disabled={isLoading}
            className={`btn btn--secondary ${isLoading ? 'btn--submited' : ''} btn--mini btn--success ml-s-6`}>
            Upload
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditAvatar;
