import { useState } from 'react';
import ErrorInput from '../../../../base/form/error-input';
import RoomSwitch from '../../../shared/room-switch';
import City from './city';

const translateRoomValues = {
  salon: 'Салон',
  cabinet: 'Кабинет',
  apartment: 'Квартира',
};

const PlaceOfWork = ({ goNext, errors, setFieldValue }) => {
  const [value, setValue] = useState('cabinet');

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

        <ErrorInput className="sign-up__group mt-5" name="placeOfWork.street" label="Улица" />

        <div className="sign-up__group sign-up__group--horizontal  mt-5">
          <ErrorInput className="sign-up__group" name="placeOfWork.house" label="Дом" />
          <ErrorInput
            className="sign-up__group mr-3 ml-3"
            name="placeOfWork.building"
            label="Корпус"
          />
          <ErrorInput className="sign-up__group" name="placeOfWork.floor" label="Этаж" />
        </div>

        <RoomSwitch
          fieldPath="placeOfWork.room.type"
          setFieldValue={setFieldValue}
          state={[value, setValue]}
        />

        <ErrorInput
          className="sign-up__group mt-5"
          name="placeOfWork.room.value"
          label={translateRoomValues[value]}
        />

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
