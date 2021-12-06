import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import Input from '../../../base/form/input';

const NameInputEdit = ({ label, data, setIsEdit }) => (
  <Formik
    initialValues={{
      name: data,
    }}
    // validationSchema={serviceSchema(sessionTime)}
    onSubmit={async (values, { resetForm }) => {
      // const { date, ...service } = values;
      // const config = {
      //   method: 'post',
      //   url: `/profile/${profileId}/service`,
      //   data: { date, service },
      //   accessToken,
      // };
      // const data = await asyncCall(dispatch, config);
      // if (data) {
      //   const { id, ...alert } = data;
      //   dispatch(addServiceSuccess({ service: { id, ...service } }));
      //   dispatch(setAlert(alert));
      //   resetForm();
      // }
    }}
  >
    {({ isSubmitting, dirty, isValidating }) => (
      <Form className="setting-card__form">
        <div className="setting-card__input">
          <label className="label">Имя</label>
          <Input name="name" className="input" type="text" />
        </div>
        <div onClick={() => null} className="setting-card__success-button btn-icon mt-3">
          <FontAwesomeIcon icon="check" />
        </div>
        <div onClick={() => setIsEdit(false)} className="setting-card__fail-button btn-icon mt-3">
          <FontAwesomeIcon icon="times" />
        </div>
      </Form>
    )}
  </Formik>
);

export default NameInputEdit;
