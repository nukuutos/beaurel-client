import React, { useState } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import { workSchema } from '../utils/schemas';
import { addWorkSuccess } from '../../../../../redux/work/actions';
import { setAlert } from '../../../../../redux/alert/actions';
import Input from '../../../../form/input';
import useAsyncAction from '../../../../../hooks/useAsyncAction';

const AddMasterWork = ({ setIsAddWork }) => {
  const [{ accessToken }, { id: profileId }] = useSelector((state) => [state.auth, state.profile]);
  const dispatch = useDispatch();
  const [asyncAction, isLoading] = useAsyncAction();

  const [{ file, src }, setState] = useState({ file: null, src: null });

  const handleFileUpload = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    setState((state) => ({ ...state, file }));

    reader.onloadend = () => {
      setState((state) => ({ ...state, src: reader.result }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="add-master-work card">
      <div className="add-master-work__heading heading-primary">Добавить работу</div>
      {!src ? (
        <>
          <img src="/svg/picture.svg" className="add-master-work__svg mt-8" alt="Picture" />
          <div className="add-master-work__text mt-8">
            <span>Перенеси изображение</span>
            <span className="mt-4">или</span>
            <div className="add-master-work__choose-image mt-4">
              <button className="btn btn--primary">Выбери</button>
              <input type="file" onChange={(e) => handleFileUpload(e)} className="add-master-work__upload-input" />
            </div>
          </div>
        </>
      ) : (
        <>
          <img src={src} alt="Uploaded image" className="add-master-work__uploaded-image mt-8" />
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

              const config = {
                method: 'post',
                url: `/profile/${profileId}/work`,
                data: formData,
                accessToken,
                addingHeaders: { 'Content-Type': `multipart/form-data`, Enctype: 'multipart/form-data' },
              };

              const data = await asyncAction(config);
              if (data) {
                const { _id, ...alert } = data;
                dispatch(addWorkSuccess({ work: { _id, title } })); // add work success
                dispatch(setAlert(alert));
                // resetForm();
                setIsAddWork(false);
              }
            }}>
            {({ isSubmitting, dirty, isValidating, values }) => (
              <Form className="add-master-work__form">
                {file && (
                  <>
                    <label htmlFor="title" className="label mt-6">
                      Название
                    </label>
                    <Input className="input add-master-work__input" type="text" name="title" id="title" />
                    <ErrorMessage name="title">
                      {(msg) => <div className="add-master-work__error error mt-1">{msg}</div>}
                    </ErrorMessage>
                  </>
                )}

                <div className="add-master-work__buttons mt-4">
                  <div
                    onClick={() => setState((state) => ({ ...state, src: null }))}
                    className={`btn btn--secondary mr-4 ${isLoading ? 'btn--disabled' : ''}`}>
                    Назад
                  </div>
                  <button
                    type="submit"
                    className={`btn btn--primary ${isLoading ? 'btn--submitted btn--spinner' : ''}`}>
                    Добавить
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default AddMasterWork;
