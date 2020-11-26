import React from 'react';
import Modal from '../../utils/modal';

import { Form, Formik } from 'formik';
import TextareaCustom from '../../form/textarea-custom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateAboutStart } from '../../../redux/profile/actions';
import Spinner from '../../utils/spinner';

const EditAbout = ({ aboutText, onClickClose }) => {
  const dispatch = useDispatch();
  const { isLoadingAbout } = useSelector((state) => state.profile);
  const updateAboutText = (aboutText) => dispatch(updateAboutStart(aboutText));

  return (
    <Modal onClickClose={onClickClose}>
      <section className="edit-about">
        <h2 className="edit-about__header">
          <FontAwesomeIcon className="edit-about__pen" icon="pen" /> Edit About Text
        </h2>
        <Formik
          enableReinitialize
          initialValues={{ about: aboutText }}
          onSubmit={(data, { setSubmitting }) => {
            updateAboutText(data.about);
          }}>
          {({ dirty, isValid }) => (
            <Form className="edit-about__form">
              <TextareaCustom
                name="about"
                id="about"
                type="text"
                placeholder="about"
                className="edit-about__text-area"
                // onFocus={(e) => e.target.removeAttribute('readonly')}
                // readOnly
              />
              {/* {isLoadingAbout && <Spinner />} */}
              <div className="align-self-end mt-s-6 display-flex">
                {isLoadingAbout && <Spinner className="spinner--tiny mr-s" />}
                <button
                  type="submit"
                  className={`btn btn--secondary ${isLoadingAbout || !dirty ? 'btn--submited' : ''}`}>
                  Update
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </Modal>
  );
};

export default EditAbout;
