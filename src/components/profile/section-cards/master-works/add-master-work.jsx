import React, { useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import { workSchema } from "./utils/schemas";
import { addWorkSuccess } from "../../../../redux/work/actions";
import { setAlert } from "../../../../redux/alert/actions";
import Input from "../../../form/input";
import useAsyncAction from "../../../../hooks/use-async-action/use-async-action";
import useMediaQuery from "../../../../hooks/use-media-query";
import ModalHeading from "../../../utils/modal/modal-heading";

const AddMasterWork = ({ setParentState }) => {
  const [{ accessToken }, { id: profileId }] = useSelector((state) => [state.auth, state.profile]);
  const isPhone = useMediaQuery(600);
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

    if (file) reader.readAsDataURL(file);
  };

  const toWorks = () => setParentState((state) => ({ ...state, display: "works" }));

  return (
    <div className={`add-master-work ${isPhone ? "" : "card"}`}>
      {isLoading && <div className="spinner-with-background" />}

      <ModalHeading title="Добавить работу" onClickClose={toWorks} />

      {src ? (
        <>
          <img src={src} alt="Uploaded image" className="add-master-work__uploaded-image" />
          <div className="add-master-work__change-btn mt-3">
            <button className="btn-text">изменить</button>
            <input type="file" onChange={(e) => handleFileUpload(e)} className="add-master-work__upload-input" />
          </div>
          <Formik
            initialValues={{
              title: "",
            }}
            validationSchema={workSchema}
            onSubmit={async (values, { resetForm }) => {
              const { title } = values;

              const formData = new FormData();
              formData.append("image", file);
              formData.append("title", title);

              const config = {
                method: "post",
                url: `/master/${profileId}/work`,
                data: formData,
                accessToken,
                addingHeaders: { "Content-Type": `multipart/form-data`, Enctype: "multipart/form-data" },
              };

              const data = await asyncAction(config);
              if (data) {
                const { _id, ...alert } = data;
                dispatch(addWorkSuccess({ work: { _id, title } }));
                dispatch(setAlert(alert));
                toWorks();
              }
            }}
          >
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
                  {!isPhone && (
                    <div onClick={toWorks} className={`btn btn--secondary mr-4 `}>
                      Назад
                    </div>
                  )}
                  <button type="submit" className={`btn btn--primary `}>
                    Добавить
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <>
          <img src="/svg/picture.svg" className="add-master-work__svg" alt="Picture" />

          <div className="add-master-work__choose-image">
            <button className="btn btn--primary">Выбрать изображение</button>
            <input type="file" onChange={(e) => handleFileUpload(e)} className="add-master-work__upload-input" />
          </div>
        </>
      )}
    </div>
  );
};

export default AddMasterWork;
