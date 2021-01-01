import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubService from './sub-service';

const DraggableSubService = ({ subService, isLastService, index }) => {
  const { id } = subService;

  return (
    <Draggable draggableId={id} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }) => {
        return (
          <div ref={innerRef} {...draggableProps} {...dragHandleProps} className="service service--droppable">
            <span className="service__draggable-lines">
              <FontAwesomeIcon icon="grip-lines-vertical" />
            </span>
            <SubService subService={subService} isLastService={isLastService} isDraggable />
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableSubService;
