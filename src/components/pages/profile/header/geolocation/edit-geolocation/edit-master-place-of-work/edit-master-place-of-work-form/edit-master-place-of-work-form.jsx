import { ErrorMessage, Form } from 'formik';
import React from 'react';
import Input from '../../../../../../../base/form/input';
import ChevronDown from '../../../../../../../base/icons/chevron-down';
import ModalHeading from '../../../../../../../base/modal/modal-heading';
import Room from './room';

const EditMasterPlaceOfWorkForm = ({ openCity, onClickClose, closeCity, ...formikProps }) => {
  const { values, errors, dirty, submitForm, setFieldValue } = formikProps;

  const handleClick = (event) => {
    event.preventDefault();
    if (dirty) submitForm();
    else closeCity();
  };

  const disabledClassName = Object.keys(errors).length ? 'btn--disabled' : '';

  return (
    <Form className="sign-up__form edit-place-of-work card">
      <ModalHeading
        onClickClose={onClickClose}
        titleDesktopClassName="edit-place-of-work__heading"
        title="Место работы"
      />

      <div className="sign-up__group">
        <div className="sign-up__group mt-7">
          <label className="label" htmlFor="city">
            Город
          </label>
          <div onClick={openCity} className="sign-up__input--city input sign-up__input">
            {values.city}
            <ChevronDown />
          </div>
        </div>
        <div className="sign-up__group mt-5">
          <label className="label" htmlFor="street">
            Улица
          </label>
          <Input className="input sign-up__input" name="street" id="street" type="text" />
          <ErrorMessage name="street">
            {(msg) => <div className="error mt-1">{msg}</div>}
          </ErrorMessage>
        </div>
        <div className="sign-up__group sign-up__group--horizontal">
          <div className="sign-up__group mt-5">
            <label className="label" htmlFor="house">
              Дом
            </label>
            <Input className="input sign-up__input" name="house" id="house" type="text" />
            <ErrorMessage name="house">
              {(msg) => <div className="error mt-1">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="sign-up__group mt-5 mr-3 ml-3">
            <label className="label sign-up__label--optional" htmlFor="building">
              Корпус
            </label>
            <Input className="input sign-up__input" name="building" id="building" type="text" />
            <ErrorMessage name="building">
              {(msg) => <div className="error mt-1">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="sign-up__group mt-5">
            <label className="label" htmlFor="floor">
              Этаж
            </label>
            <Input className="input sign-up__input" name="floor" id="floor" type="text" />
            <ErrorMessage name="floor">
              {(msg) => <div className="error mt-1">{msg}</div>}
            </ErrorMessage>
          </div>
        </div>

        <Room setFieldValue={setFieldValue} />

        <button
          onClick={handleClick}
          type="submit"
          className={`btn btn--primary ${disabledClassName} sign-up__btn mt-6`}
        >
          Сохранить
        </button>
      </div>
    </Form>
  );
};

export default EditMasterPlaceOfWorkForm;
