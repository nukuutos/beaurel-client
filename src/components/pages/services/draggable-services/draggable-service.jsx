import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import Service from '../service';
import DraggableVerticalLines from './draggable-horizontal-lines';
import useMediaQuery from '../../../../hooks/use-media-query';
import DraggableHorizontalLines from './draggable-horizontal-lines';

const DraggableService = ({ service, index }) => {
  const { id } = service;

  return (
    <Draggable draggableId={id} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
        <div
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
          className="draggable-service card service--hover service mt-6"
        >
          <Service service={service} />

          <div className="draggable-service__lines">
            <DraggableHorizontalLines
              className={`draggable-service__icon ${
                isDragging ? 'draggable-service__icon--dragging' : ''
              }`}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableService;
