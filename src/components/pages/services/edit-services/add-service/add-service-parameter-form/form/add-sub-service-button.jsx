import React from 'react';
import { useSelector } from 'react-redux';
import Plus from '../../../../../../base/icons/plus';

const AddSubServiceButton = ({ push }) => {
  const { sessionTime, update } = useSelector((state) => state.timetable);

  return (
    <button
      type="button"
      className="add-service__add card mt-6"
      onClick={() =>
        push({
          parameter: '',
          duration: sessionTime,
          price: '',
          updateDuration: update?.sessionTime || null,
        })
      }
    >
      <Plus />
    </button>
  );
};
export default AddSubServiceButton;
