import React, { useState, useEffect } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import { workSchema } from './utils/schemas';
import { addWorkSuccess } from '../../../../redux/work/actions';
import { setAlert } from '../../../../redux/alert/actions';
import Input from '../../../form/input';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';

const AddMasterWork = ({ setParentState }) => {
  const [{ accessToken }, { id: profileId }] = useSelector((state) => [state.auth, state.profile]);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

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
      <div className="add-master-work__heading heading">Добавить работу</div>
      {src ? (
        <>
          <img src={src} alt="Uploaded image" className="add-master-work__uploaded-image mt-8" />
          <div className="add-master-work__choose-image add-master-work__change-btn mt-3">
            <button className="btn-text">изменить</button>
            <input type="file" onChange={(e) => handleFileUpload(e)} className="add-master-work__upload-input" />
          </div>
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
                url: `/master/${profileId}/work`,
                data: formData,
                accessToken,
                addingHeaders: { 'Content-Type': `multipart/form-data`, Enctype: 'multipart/form-data' },
              };

              const data = await asyncAction(config);
              if (data) {
                const { _id, ...alert } = data;
                dispatch(addWorkSuccess({ work: { _id, title } }));
                dispatch(setAlert(alert));
                setParentState((state) => ({ ...state, display: 'works' }));
              }
            }}>
            {({ isSubmitting, dirty, isValidating, values }) => (
              <Form className="add-master-work__form ">
                <label htmlFor="title" className="label mt-2">
                  Название
                </label>
                <Input className="input add-master-work__input" type="text" name="title" id="title" />
                <ErrorMessage name="title">
                  {(msg) => <div className="add-master-work__error error mt-1">{msg}</div>}
                </ErrorMessage>

                <div className="add-master-work__buttons mt-6">
                  <div
                    onClick={() => setParentState((state) => ({ ...state, display: 'works' }))}
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
      ) : (
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
      )}
    </div>
  );
};

export default AddMasterWork;
