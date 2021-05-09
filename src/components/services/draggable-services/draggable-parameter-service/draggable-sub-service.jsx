import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import SubService from '../../parameter-service/sub-service';
import DraggableVerticalLines from '../draggable-vertical-lines';

const DraggableSubService = ({ onMouseLeave, onMouseEnter, subService, index }) => {
  const [isHover, setIsHover] = useState(false);
  const { id } = subService;

  return (
    <Draggable draggableId={id} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => {
        return (
          <div
            ref={innerRef}
            {...draggableProps}
            {...dragHandleProps}
            onMouseEnter={() => {
              setIsHover(true);
              onMouseEnter();
            }}
            onMouseLeave={() => {
              setIsHover(false);
              onMouseLeave();
            }}
            //  draggable-service
            className={`service draggable-service draggable-service-parameter__sub-service
            ${isHover || isDragging ? 'draggable-service--hover' : ''}`}>
            <div className="draggable-service__icon-wrapper">
              <DraggableVerticalLines
                className={`draggable-service__icon ${isDragging ? 'draggable-service__icon--dragging' : ''} ml-4`}
              />
            </div>
            <SubService subService={subService} />
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableSubService;
