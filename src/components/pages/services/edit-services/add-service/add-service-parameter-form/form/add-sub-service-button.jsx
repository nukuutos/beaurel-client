import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';

const AddSubServiceButton = ({ push }) => {
  const { sessionTime } = useSelector((state) => state.timetable);
  return (
    <button
      type="button"
      className="add-service__add card mt-6"
      onClick={() => push({ parameter: '', duration: sessionTime, price: '' })}
    >
      <FontAwesomeIcon icon="plus" />
    </button>
  );
};
export default AddSubServiceButton;
