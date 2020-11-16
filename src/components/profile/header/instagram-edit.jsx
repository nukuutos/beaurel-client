import React from 'react';
import { Form, Formik } from 'formik';

import Modal from '../utils/modal';
import InputCustom from '../../form/input-custom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InstagramEdit = ({ onClickClose, instagramUsername = '' }) => {
  return (
    <Modal onClickClose={onClickClose}>
      <section className="edit-about">
        <h2 className="modal__header">
          <FontAwesomeIcon className="edit-about__pen" icon="pen" /> Edit Instagram
        </h2>
        <Formik
          initialValues={{ username: instagramUsername }}
          onSubmit={(data, { setSubmitting }) => {
            // updateProfile(data);
          }}>
          {({ isSubmitting }) => (
            <Form className="edit-about__form">
              <InputCustom
                name="username"
                id="username"
                type="text"
                placeholder="Your username..."
                className="instagram-edit__input"
                // onFocus={(e) => e.target.removeAttribute('readonly')}
                // readOnly
              />
              <button className="btn btn--secondary mt-m">Update</button>
            </Form>
          )}
        </Formik>
      </section>
    </Modal>
  );
};

export default InstagramEdit;
