import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';

const EditButton = ({ editState }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  const [state, setState] = editState;

  const openEditModal = () => {
    setState({ isEditing: true, element: { ...state.element, weekends: true } });
  };

  const phoneClassName = isPhone ? 'timetable-card__btn-edit--bottom' : '';

  return (
    <div onClick={openEditModal} className={`timetable-card__btn-edit ${phoneClassName} btn-icon`}>
      <FontAwesomeIcon icon="pen" />
    </div>
  );
};

export default EditButton;
