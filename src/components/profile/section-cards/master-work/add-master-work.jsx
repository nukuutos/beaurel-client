import React, { useState, useRef } from 'react';
import Spinner from '../../../utils/spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputCustom from '../../../form/input-custom';
import { ErrorMessage, Form, Formik } from 'formik';
import { workSchema } from './utils/schemas';
import { useSelector, useDispatch } from 'react-redux';
import asyncCall from '../../../../utils/async-call';
import { addWorkSuccess } from '../../../../redux/work/actions';
import { setAlert } from '../../../../redux/alert/actions';

const AddMasterWork = ({ setIsAddWork }) => {
  const [{ accessToken }, { id: profileId }] = useSelector((state) => [state.auth, state.profile]);
  const dispatch = useDispatch();

  // state to store uploaded image and title
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState('data:,');

  // to hook
  const [isUpload, setIsUpload] = useState(false);
  const imageOutput = useRef();

  const handleFileUpload = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    setFile(file);

    reader.onloadend = () => {
      setSrc(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="master-works master-works--add">
      <div className="master-works__heading">Add Your New Work</div>
      <img src={src} alt="Uploaded image" className="mt-s-6 master-works__image--add" />

      <Formik
        initialValues={{
          title: '',
        }}
        validationSchema={workSchema}
        onSubmit={async (values, { resetForm }) => {
          const { title } = values;

          const formData = new FormData();
          formData.append('image', file);
          formData.append('title', title);

          console.log(formData);
          const config = {
            method: 'post',
            url: `/profile/${profileId}/work`,
            data: formData,
            accessToken,
            // addingHeaders: { 'Content-Type': `multipart/form-data; boundary=${formData._boundary}` },
            addingHeaders: { 'Content-Type': `multipart/form-data`, Enctype: 'multipart/form-data' },
          };

          const data = await asyncCall(dispatch, config);
          console.log(data);
          if (data) {
            const { _id, ...alert } = data;
            dispatch(addWorkSuccess({ work: { _id, title } })); // add work success
            dispatch(setAlert(alert));
            // resetForm();
            setIsAddWork(false);
          }
        }}>
        {({ isSubmitting, dirty, isValidating, values }) => (
          <Form className="master-works__form master-works__form--add">
            {file && (
              <>
                <InputCustom
                  placeholder="Title"
                  className="service__input mt-s-6"
                  type="text"
                  name="title"
                  id="title"
                />
                <ErrorMessage name="title">{(msg) => <div className="master-works__error">{msg}</div>}</ErrorMessage>
              </>
            )}

            <div className="select gc-f mt-s-6 mb-s-2">
              {isSubmitting && <Spinner className="spinner--edge spinner--tiny" />}
              <button className={`btn btn--secondary btn--mini`}>Select Image</button>
              <input type="file" onChange={(e) => handleFileUpload(e)} className="select__input" />
              {file && (
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn--secondary btn--mini btn--success ml-s-6">
                  Upload
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddMasterWork;
