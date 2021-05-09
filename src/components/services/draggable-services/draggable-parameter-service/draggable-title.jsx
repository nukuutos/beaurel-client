import React from 'react';
import Title from '../../parameter-service/title';
import DraggableVerticalLines from '../draggable-vertical-lines';

const DraggableTitle = ({ title, shownState, isDragging }) => {
  const [isShown] = shownState;

  return (
    <>
      <div className="draggable-service__icon-wrapper">
        <DraggableVerticalLines
          className={`draggable-service__icon ${isDragging ? 'draggable-service__icon--dragging' : ''} ml-4`}
        />
      </div>
      <Title shownState={shownState} title={title} />
    </>
  );
};

export default DraggableTitle;
