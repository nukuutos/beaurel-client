import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Draggable } from 'react-beautiful-dnd';
import Service from '../service';
import DraggableVerticalLines from './draggable-vertical-lines';
import { useState } from 'react';

const DraggableService = ({ service, index }) => {
  const [isHover, setIsHover] = useState(false);
  const { id } = service;

  return (
    <Draggable draggableId={id} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => {
        return (
          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            ref={innerRef}
            {...draggableProps}
            {...dragHandleProps}
            className={`draggable-service draggable-service--shadow 
            ${isHover || isDragging ? 'draggable-service--hover' : ''} service mt-6`}>
            <div className="draggable-service__icon-wrapper">
              <DraggableVerticalLines
                className={`draggable-service__icon ${isDragging ? 'draggable-service__icon--dragging' : ''} ml-4`}
              />
            </div>
            <Service service={service} />
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableService;
