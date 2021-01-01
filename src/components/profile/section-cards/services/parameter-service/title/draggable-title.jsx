import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Title from './title';

const DraggableTitle = ({ title, shownState }) => {
  const [isShown] = shownState;

  return (
    <Title shownState={shownState} title={title} isDroppable>
      <span className={`service__draggable-lines ${isShown ? 'service__draggable-lines--disabled' : ''}`}>
        <FontAwesomeIcon icon="grip-lines-vertical" />
      </span>
    </Title>
  );
};

export default DraggableTitle;
