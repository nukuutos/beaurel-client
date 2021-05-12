import React, { useState, useEffect } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import { workSchema } from './utils/schemas';
import { updateWorkSuccess } from '../../../../redux/work/actions';
import { setAlert } from '../../../../redux/alert/actions';
import Input from '../../../form/input';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';

const EditMasterWork = ({ state }) => {
  const [{ accessToken }, { id: profileId }, { works }] = useSelector((state) => [
    state.auth,
    state.profile,
    state.work,
  ]);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const [{ file, src }, setState] = useState({ file: null, src: null });
  const [{ index }, setParentState] = state;

  useEffect(() => {
    setState((state) => ({ ...state, src: `http://localhost:5000/images/works/${works[index]._id}.png` }));
  }, [setState]);

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
      <img src={src} alt="Uploaded image" className="add-master-work__uploaded-image mt-8" />
      {/* change button */}
      <div className="add-master-work__choose-image add-master-work__change-btn mt-3">
        <button className="btn-text">изменить</button>
        <input type="file" onChange={(e) => handleFileUpload(e)} className="add-master-work__upload-input" />
      </div>
      <Formik
        initialValues={{
          title: works[index].title,
        }}
        validationSchema={workSchema}
        onSubmit={async (values, { resetForm }) => {
          const { title } = values;

          const formData = new FormData();
          formData.append('image', file);
          formData.append('title', title);

          const config = {
            method: 'put',
            url: `/profile/${profileId}/work/${works[index]._id}`,
            data: formData,
            accessToken,
            addingHeaders: { 'Content-Type': `multipart/form-data`, Enctype: 'multipart/form-data' },
          };

          const data = await asyncAction(config);

          if (data) {
            const { _id, ...alert } = data;
            dispatch(updateWorkSuccess({ updatedWork: { _id, title } }));
            dispatch(setAlert(alert));
            setParentState((state) => ({ ...state, display: 'carousel' }));
          }
        }}>
        {({}) => (
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
                onClick={() => setParentState((state) => ({ ...state, display: index ? 'carousel' : 'works' }))}
                className={`btn btn--secondary mr-4 ${isLoading ? 'btn--disabled' : ''}`}>
                Назад
              </div>
              <button type="submit" className={`btn btn--primary ${isLoading ? 'btn--submitted btn--spinner' : ''}`}>
                Добавить
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditMasterWork;
