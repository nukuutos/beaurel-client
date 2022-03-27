import { ErrorMessage } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Input from '../../../../../../base/form/input';

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

const Room = ({ setFieldValue }) => {
  const { room } = useSelector((state) => state.profile.placeOfWork);
  const [value, setValue] = useState(room.type);

  const setSalon = createSetSwitchValue({ value: 'salon', setFieldValue, setValue });
  const setCabinet = createSetSwitchValue({ value: 'cabinet', setFieldValue, setValue });
  const setApartment = createSetSwitchValue({
    value: 'apartment',
    setFieldValue,
    setValue,
  });

  return (
    <>
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
          name="room.value"
          id="room-value"
          type="text"
        />
        <ErrorMessage name="room.value">
          {(msg) => <div className="error mt-1">{msg}</div>}
        </ErrorMessage>
      </div>
    </>
  );
};

export default Room;
