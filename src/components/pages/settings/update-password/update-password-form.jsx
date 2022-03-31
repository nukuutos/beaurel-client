import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import Input from '../../../base/form/input';
import Modal from '../../../base/modal/modal';
import ModalHeading from '../../../base/modal/modal-heading';
import { updatePasswordSchema } from './schema';
import useOnSubmit from './use-on-submit';

const UpdatePasswordForm = ({ onClickClose }) => {
  const [handleSubmit, isLoading] = useOnSubmit({ onClickClose });

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
              <div className="update-password__group">
                <label className="label" htmlFor="password">
                  Ваш текущий пароль
                </label>
                <Input
                  className="input update-password__input"
                  name="password"
                  id="password"
                  type="password"
                />
                <ErrorMessage name="password">
                  {(msg) => <div className="error mt-1">{msg}</div>}
                </ErrorMessage>
              </div>

              <div className="update-password__group mt-6">
                <label className="label" htmlFor="newPassword">
                  Новый пароль
                </label>
                <Input
                  className="input update-password__input"
                  name="newPassword"
                  id="newPassword"
                  type="password"
                />
                <ErrorMessage name="newPassword">
                  {(msg) => <div className="error mt-1">{msg}</div>}
                </ErrorMessage>
              </div>

              <div className="update-password__group mt-6">
                <label className="label" htmlFor="newConfirmedPassword">
                  Подтвердите новый пароль
                </label>
                <Input
                  className="input update-password__input"
                  name="newConfirmedPassword"
                  id="newConfirmedPassword"
                  type="password"
                />
                <ErrorMessage name="newConfirmedPassword">
                  {(msg) => <div className="error mt-1">{msg}</div>}
                </ErrorMessage>
              </div>

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
