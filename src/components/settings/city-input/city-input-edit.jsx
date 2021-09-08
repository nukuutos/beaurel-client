import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import Input from "../../form/input";

const CityInputEdit = ({ data, setIsEdit }) => {
  return (
    <Formik
      initialValues={{
        email: data,
      }}
      onSubmit={async (values, { resetForm }) => {}}
    >
      {({ isSubmitting, dirty, isValidating }) => (
        <Form className="setting-card__form">
          <div className="setting-card__input">
            <label className="label">Email</label>
            <Input name="city" className="input" type="text" />
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
};

export default CityInputEdit;
