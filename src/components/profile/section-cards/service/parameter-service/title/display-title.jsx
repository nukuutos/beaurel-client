import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DisplayTitle = ({ title, setIsEdit, shownState }) => {
  const [isShown, setIsShown] = shownState;

  return (
    <>
      <span
        onClick={() => setIsShown(!isShown)}
        className={`service__cell service__title service__title--parameter ${
          !isShown ? 'service__title--hidden-parameters' : ''
        }`}>
        <div className="service__icon mr-s">
          <FontAwesomeIcon
            className={`service__icon--reveal ${isShown ? 'service__icon--reveal-rotated' : ''}`}
            icon="caret-right"
          />
        </div>
        {title}
      </span>
      <div onClick={() => setIsEdit(true)} className="service__icon service__icon--manage">
        <FontAwesomeIcon className="service__manage-icon " icon="pen" />
      </div>
      <div
        onClick={() => dispatch(deleteServiceStart({ type: 'parameter', service: { title } }))}
        className="service__icon service__icon--manage">
        <FontAwesomeIcon className="service__manage-icon" icon="trash" />
      </div>
    </>
  );
};

export default DisplayTitle;
