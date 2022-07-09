import { ErrorMessage } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Input from '../../../../../../../base/form/input';
import RoomSwitch from '../../../../../../shared/room-switch';

const translateRoomValues = {
  salon: 'Салон',
  cabinet: 'Кабинет',
  apartment: 'Квартира',
};

const Room = ({ setFieldValue }) => {
  const { room } = useSelector((state) => state.profile.placeOfWork);
  const [value, setValue] = useState(room.type);

  return (
    <>
      <RoomSwitch fieldPath="room.type" setFieldValue={setFieldValue} state={[value, setValue]} />
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
