import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'formik';

const Edit = ({ label, data, setIsEdit }) => {
  return (
    // <Formik
    //   initialValues={{
    //     title: '',
    //     duration: sessionTime,
    //     price: '',
    //     date: null,
    //   }}
    //   validationSchema={serviceSchema(sessionTime)}
    //   onSubmit={async (values, { resetForm }) => {
    //     // const { date, ...service } = values;

    //     // const config = {
    //     //   method: 'post',
    //     //   url: `/profile/${profileId}/service`,
    //     //   data: { date, service },
    //     //   accessToken,
    //     // };

    //     // const data = await asyncCall(dispatch, config);

    //     // if (data) {
    //     //   const { id, ...alert } = data;
    //     //   dispatch(addServiceSuccess({ service: { id, ...service } }));
    //     //   dispatch(setAlert(alert));
    //     //   resetForm();
    //     // }
    //   }}>
    //   {({ isSubmitting, dirty, isValidating }) => (
    //     <Form className="add-service__form">
    <>
      <div className="setting-card__input">
        <label className="label">{label}</label>
        <input className="input" value={data} type="text" />
      </div>
      <div onClick={() => null} className="setting-card__success-button btn-icon mt-3">
        <FontAwesomeIcon icon="check" />
      </div>
      <div onClick={() => setIsEdit(false)} className="setting-card__fail-button btn-icon mt-3">
        <FontAwesomeIcon icon="times" />
      </div>
    </>
    //   )}
    // </Formik>
  );
};

export default Edit;
