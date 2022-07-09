import { Form, Formik } from 'formik';
import React from 'react';
import ErrorInput from '../../../base/form/error-input';
import Modal from '../../../base/modal/modal';
import ModalHeading from '../../../base/modal/modal-heading';
import { updatePasswordSchema } from './schema';
import useOnSubmit from './use-on-submit';

const UpdatePasswordForm = ({ onClickClose }) => {
  const [handleSubmit] = useOnSubmit({ onClickClose });

  return (
    <Modal onClickClose={onClickClose}>
      <div className="update-password card">
        <ModalHeading title="Обновить пароль" onClickClose={onClickClose} />
        <Formik
          validationSchema={updatePasswordSchema}
          initialValues={{
            password: '',
            newPassword: '',
            newConfirmedPassword: '',
          }}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="update-password__form">
              <ErrorInput
                className="update-password__group"
                name="password"
                label="Ваш текущий пароль"
                type="password"
              />

              <ErrorInput
                className="update-password__group mt-6"
                name="newPassword"
                label="Новый пароль"
                type="password"
              />

              <ErrorInput
                className="update-password__group mt-6"
                name="newConfirmedPassword"
                label="Подтвердите новый пароль"
                type="password"
              />

              <button type="submit" className="btn btn--primary mt-6">
                Изменить
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default UpdatePasswordForm;
