import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Title = ({ shownState, title, children, isDraggable = false }) => {
  const [isShown, setIsShown] = shownState;
  // service__title--draggable
  const classNameParameter = `service__title  ${isDraggable ? 'service__title--draggable' : ''} ${
    !isShown ? 'service__title--hidden' : ''
  }`;

  return (
    <>
      {children}
      <span className={classNameParameter}>{title}</span>
      <div className={`service-parameter__icon ${isShown ? 'service-parameter__icon--rotated' : ''} mr-s`}>
        <FontAwesomeIcon icon="caret-left" />
      </div>
    </>
  );
};

export default Title;
