import React, { useState, useEffect, useRef } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import { workSchema } from './utils/schemas';
import { updateWorkSuccess } from '../../../../../redux/work/actions';
import { setAlert } from '../../../../../redux/alert/actions';
import Input from '../../../../base/form/input';
import useAsyncAction from '../../../../../hooks/use-async-action/use-async-action';
import ModalHeading from '../../../../base/modal/modal-heading';
import useMediaQuery from '../../../../../hooks/use-media-query';

const EditMasterWork = ({ state }) => {
  const [{ accessToken }, { id: profileId }, { works }] = useSelector((state) => [
    state.auth,
    state.profile,
    state.work,
  ]);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();
  const isPhone = useMediaQuery(600);

  const [{ file, src }, setState] = useState({ file: null, src: null });
  const [{ index }, setParentState] = state;

  useEffect(() => {
    setState((state) => ({
      ...state,
      src: `http://localhost:5000/images/works/${works[index]._id}.png`,
    }));
  }, [setState]);

  const formRef = useRef({});
  const { setFieldValue } = formRef.current;

  const handleFileUpload = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    setState((state) => ({ ...state, file }));

    reader.onloadend = () => {
      setState((state) => ({ ...state, src: reader.result }));
      setFieldValue(src, reader.result);
    };

    if (file) reader.readAsDataURL(file);
  };

  const toCarousel = () => setParentState((state) => ({ ...state, display: 'carousel' }));
  const toWorks = () => setParentState((state) => ({ ...state, display: 'works' }));

  return (
    <div className={`add-master-work ${isPhone ? '' : 'card'}`}>
      <ModalHeading title="Обновить работу" onClickClose={toCarousel} />
      {isLoading && <div className="spinner-with-background" />}
      <img src={src} alt="Uploaded image" className="add-master-work__uploaded-image" />

      {/* change button */}
      <div className="add-master-work__choose-image add-master-work__change-btn mt-3">
        <button className="btn-text">изменить</button>
        <input
          type="file"
          onChange={(e) => handleFileUpload(e)}
          className="add-master-work__upload-input"
        />
      </div>

      <Formik
        innerRef={formRef}
        initialValues={{
          title: works[index].title,
          src: null,
        }}
        validationSchema={workSchema}
        onSubmit={async (values, { resetForm }) => {
          const { title } = values;

          const formData = new FormData();
          formData.append('image', file);
          formData.append('title', title);

          const config = {
            method: 'put',
            url: `/master/${profileId}/work/${works[index]._id}`,
            data: formData,
            accessToken,
            addingHeaders: {
              'Content-Type': `multipart/form-data`,
              Enctype: 'multipart/form-data',
            },
          };

          const alert = await asyncAction(config);

          if (alert) {
            dispatch(updateWorkSuccess({ updatedWork: { _id: works[index]._id, title } }));
            dispatch(setAlert(alert));
            setParentState((state) => ({ ...state, display: 'carousel' }));
          }
        }}
      >
        {({ submitForm, dirty, values }) => (
          <Form className="add-master-work__form ">
            <label htmlFor="title" className="label mt-2">
              Название
            </label>
            <Input className="input add-master-work__input" type="text" name="title" id="title" />
            <ErrorMessage name="title">
              {(msg) => <div className="add-master-work__error error mt-1">{msg}</div>}
            </ErrorMessage>

            <div className="add-master-work__buttons mt-6">
              {!isPhone && (
                <div onClick={index ? toCarousel : toWorks} className="btn btn--secondary mr-4">
                  Назад
                </div>
              )}

              <button
                onClick={(event) => {
                  event.preventDefault();
                  console.log(dirty, values.src);
                  if (dirty) submitForm();
                  else toCarousel();
                }}
                type="submit"
                className="btn btn--primary"
              >
                Обновить
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditMasterWork;
