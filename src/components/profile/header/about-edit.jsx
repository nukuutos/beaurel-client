import React from 'react';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Modal from '../../utils/modal';
import { updateAboutStart, updateAboutSuccess } from '../../../redux/profile/actions';
import Spinner from '../../utils/spinner';
import Textarea from '../../form/textarea';
import asyncCall from '../../../utils/async-call';
import { setAlert } from '../../../redux/alert/actions';

const AboutEdit = ({ onClickClose }) => {
  const dispatch = useDispatch();
  const [{ aboutText }, { id, accessToken }] = useSelector((state) => [state.profile, state.auth]);

  const updateAboutText = (aboutText) => dispatch(updateAboutStart(aboutText));

  return (
    <Modal onClickClose={onClickClose}>
      <section className="edit-about card">
        <h2 className="edit-about__heading heading-primary">О себе</h2>
        <Formik
          enableReinitialize
          initialValues={{ aboutText }}
          onSubmit={async (values, { initialValues }) => {
            const config = {
              method: 'patch',
              url: `/profile/${id}`,
              data: values,
              accessToken,
            };

            const alert = await asyncCall(dispatch, config);

            if (alert) {
              dispatch(updateAboutSuccess(values.aboutText)); // add work success
              dispatch(setAlert(alert));
              onClickClose();
            }
          }}>
          {({ values, dirty, isValid, submitForm }) => (
            <Form className="edit-about__form">
              <Textarea className="edit-about__textarea textarea mt-8" name="aboutText" maxLength={150} />
              <div className="edit-about__counter mt-2">{values.aboutText.length}/150</div>

              <div className="edit-about__button mt-6">
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    if (dirty) submitForm();
                    else onClickClose();
                  }}
                  type="submit"
                  className={`btn btn--primary`}>
                  Сохранить
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </Modal>
  );
};

export default AboutEdit;
