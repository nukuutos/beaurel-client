import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Title from '../../parameter-service/title';

const DraggableTitle = ({ title, shownState }) => {
  const [isShown] = shownState;

  return (
    <Title shownState={shownState} title={title} isDraggable>
      <span className={`service__draggable-icon ${isShown ? 'service__draggable-lines--disabled' : ''}`}>
        <FontAwesomeIcon icon="grip-vertical" />
      </span>
    </Title>
  );
};

export default DraggableTitle;
