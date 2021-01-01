import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Title = ({ shownState, title, children, isDroppable = false }) => {
  const [isShown, setIsShown] = shownState;

  const classNameService = `service ${isDroppable ? 'service--droppable' : ''} ${!isShown ? 'mb-s-4' : ''}`;
  const classNameParameter = `service__title service__title--parameter ${
    isDroppable ? 'service__title--draggable-parameter' : ''
  } ${!isShown ? 'service__title--hidden' : ''}`;

  return (
    <div onClick={() => setIsShown(!isShown)} className={classNameService}>
      {children}
      <span className={classNameParameter}>
        <div className={`service__icon service__icon--reveal ${isShown ? 'service__icon--reveal-rotated' : ''} mr-s`}>
          <FontAwesomeIcon className={` `} icon="caret-right" />
        </div>
        {title}
      </span>
    </div>
  );
};

export default Title;
