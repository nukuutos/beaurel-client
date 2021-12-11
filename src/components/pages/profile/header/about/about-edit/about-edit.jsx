import React from 'react';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';

import Modal from '../../../../../base/modal';
import Textarea from '../../../../../base/form/textarea';
import ModalHeading from '../../../../../base/modal/modal-heading';
import aboutTextSchema from './schema';
import useOnSubmit from './use-on-submit';
import submit from './submit';

const AboutEdit = ({ onClickClose }) => {
  const [{ aboutText }, { isPhone }] = useSelector((state) => [state.profile, state.screenSize]);
  const [onSubmit] = useOnSubmit(onClickClose);

  return (
    <Modal isMobileBackground onClickClose={onClickClose}>
      <section className={`edit-about ${isPhone ? '' : 'card'}`}>
        <ModalHeading title="O себе" onClickClose={onClickClose} />
        <Formik
          validationSchema={aboutTextSchema}
          enableReinitialize
          initialValues={{ aboutText }}
          onSubmit={onSubmit}
        >
          {({ values, isSubmitting, ...restFormikProps }) => (
            <Form className="edit-about__form">
              <Textarea
                className="edit-about__textarea textarea"
                name="aboutText"
                maxLength={150}
              />
              <div className="edit-about__counter mt-2">{values.aboutText.length}/150</div>

              <button
                onClick={submit({ values, onClickClose, ...restFormikProps })}
                type="submit"
                className={`edit-about__button mt-6 btn btn--primary ${
                  isSubmitting ? 'btn--submitted btn--spinner' : ''
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
