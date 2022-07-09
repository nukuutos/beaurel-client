const createSetSwitchValue =
  ({ value, setFieldValue, setValue, fieldPath }) =>
  () => {
    setFieldValue(fieldPath, value);
    setValue(value);
  };

const RoomSwitch = ({ state, setFieldValue, fieldPath }) => {
  const [value, setValue] = state;

  const setSalon = createSetSwitchValue({ value: 'salon', setFieldValue, setValue, fieldPath });
  const setCabinet = createSetSwitchValue({ value: 'cabinet', setFieldValue, setValue, fieldPath });
  const setApartment = createSetSwitchValue({
    value: 'apartment',
    setFieldValue,
    setValue,
    fieldPath,
  });

  return (
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
  );
};

export default RoomSwitch;
