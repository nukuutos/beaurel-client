import React from "react";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../../utils/modal";
import { updateAboutSuccess } from "../../../../redux/profile/actions";
import Textarea from "../../../form/textarea";
import { setAlert } from "../../../../redux/alert/actions";
import useAsyncAction from "../../../../hooks/use-async-action/use-async-action";
import useMediaQuery from "../../../../hooks/use-media-query";
import ModalHeading from "../../../utils/modal/modal-heading";
import aboutTextSchema from "./schema";

const AboutEdit = ({ onClickClose }) => {
  const dispatch = useDispatch();
  const [{ aboutText }, { id, accessToken }] = useSelector((state) => [state.profile, state.auth]);
  const [asyncAction, isLoading] = useAsyncAction();
  const isPhone = useMediaQuery(600);

  return (
    <Modal isMobileBackground onClickClose={onClickClose}>
      <section className={`edit-about ${isPhone ? "" : "card"}`}>
        {/* <h2 className="edit-about__heading heading heading--modal">О себе</h2> */}
        <ModalHeading title="O себе" onClickClose={onClickClose} />
        <Formik
          validationSchema={aboutTextSchema}
          enableReinitialize
          initialValues={{ aboutText }}
          onSubmit={async (values) => {
            const config = {
              method: "patch",
              url: `/profile/${id}`,
              data: values,
              accessToken,
            };

            const alert = await asyncAction(config);

            if (alert) {
              dispatch(updateAboutSuccess(values.aboutText.trim()));
              dispatch(setAlert(alert));
              onClickClose();
            }
          }}
        >
          {({ values, dirty, submitForm, isSubmitting, initialValues }) => (
            <Form className="edit-about__form">
              <Textarea className="edit-about__textarea textarea" name="aboutText" maxLength={150} />
              <div className="edit-about__counter mt-2">{values.aboutText.length}/150</div>

              <button
                onClick={(event) => {
                  event.preventDefault();

                  // "            " === " "
                  // "            " === "d"
                  const trimmedAboutText = values.aboutText.trim();
                  const areValuesEqual = trimmedAboutText === initialValues.aboutText;

                  if (dirty && !areValuesEqual) submitForm();
                  else onClickClose();
                }}
                type="submit"
                className={`edit-about__button mt-6 btn btn--primary ${
                  isSubmitting ? "btn--submitted btn--spinner" : ""
                }`}
              >
                Сохранить
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </Modal>
  );
};

export default AboutEdit;
