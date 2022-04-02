import { ErrorMessage } from 'formik';
import { useState } from 'react';
import Input from '../../../base/form/input';
import City from './city';

const translateRoomValues = {
  salon: 'Салон',
  cabinet: 'Кабинет',
  apartment: 'Квартира',
};

const createSetSwitchValue =
  ({ value, setFieldValue, setValue }) =>
  () => {
    setFieldValue('room.type', value);
    setValue(value);
  };

const PlaceOfWork = ({ goNext, errors, setFieldValue }) => {
  const [value, setValue] = useState('cabinet');

  const setSalon = createSetSwitchValue({ value: 'salon', setFieldValue, setValue });
  const setCabinet = createSetSwitchValue({ value: 'cabinet', setFieldValue, setValue });
  const setApartment = createSetSwitchValue({ value: 'apartment', setFieldValue, setValue });

  const handleNext = () => {
    if (errors.placeOfWork) return;
    goNext();
  };

  const disabledClassName = errors.placeOfWork ? 'btn--disabled' : '';

  return (
    <>
      <h2 className="sign-up__heading">Выберите Ваш город</h2>
      <div className="sign-up__group">
        <City />
        <div className="sign-up__group mt-5">
          <label className="label" htmlFor="street">
            Улица
          </label>
          <Input
            className="input sign-up__input"
            name="placeOfWork.street"
            id="street"
            type="text"
          />
          <ErrorMessage name="placeOfWork.street">
            {(msg) => <div className="error mt-1">{msg}</div>}
          </ErrorMessage>
        </div>
        <div className="sign-up__group sign-up__group--horizontal">
          <div className="sign-up__group mt-5">
            <label className="label" htmlFor="house">
              Дом
            </label>
            <Input
              className="input sign-up__input"
              name="placeOfWork.house"
              id="house"
              type="text"
            />
            <ErrorMessage name="placeOfWork.house">
              {(msg) => <div className="error mt-1">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="sign-up__group mt-5 mr-3 ml-3">
            <label className="label sign-up__label--optional" htmlFor="building">
              Корпус
            </label>
            <Input
              className="input sign-up__input"
              name="placeOfWork.building"
              id="building"
              type="text"
            />
            <ErrorMessage name="placeOfWork.building">
              {(msg) => <div className="error mt-1">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="sign-up__group mt-5">
            <label className="label" htmlFor="floor">
              Этаж
            </label>
            <Input
              className="input sign-up__input"
              name="placeOfWork.floor"
              id="floor"
              type="text"
            />
            <ErrorMessage name="placeOfWork.floor">
              {(msg) => <div className="error mt-1">{msg}</div>}
            </ErrorMessage>
          </div>
        </div>

        <div className="sign-up__group--horizontal switch mt-5">
          <button
            type="button"
            className={`switch__label ${value === 'cabinet' ? 'switch__label--active' : ''}`}
            onClick={setCabinet}
          >
            кабинет
          </button>
          <button
            type="button"
            className={`switch__label ${value === 'salon' ? 'switch__label--active' : ''}`}
            onClick={setSalon}
          >
            салон
          </button>
          <button
            type="button"
            className={`switch__label ${value === 'apartment' ? 'switch__label--active' : ''}`}
            onClick={setApartment}
          >
            квартира
          </button>
        </div>
        <div className="sign-up__group mt-5">
          <label className="label" htmlFor="room-value">
            {translateRoomValues[value]}
          </label>
          <Input
            validateOnBlur={false}
            className="input sign-up__input"
            name="placeOfWork.room.value"
            id="room-value"
            type="text"
          />
          <ErrorMessage name="placeOfWork.room.value">
            {(msg) => <div className="error mt-1">{msg}</div>}
          </ErrorMessage>
        </div>

        <button
          onClick={handleNext}
          type="button"
          className={`${disabledClassName} btn btn--primary sign-up__btn mt-6`}
        >
          Продолжить
        </button>
      </div>
    </>
  );
};

export default PlaceOfWork;
