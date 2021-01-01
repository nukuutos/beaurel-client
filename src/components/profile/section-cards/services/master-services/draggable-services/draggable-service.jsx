import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Draggable } from 'react-beautiful-dnd';
import Service from '../../service';

const DraggableService = ({ service, index }) => {
  const { id } = service;

  return (
    <Draggable draggableId={id} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }) => {
        return (
          <div ref={innerRef} {...draggableProps} {...dragHandleProps} className="service service--droppable mb-s-4">
            <span className="service__draggable-lines">
              <FontAwesomeIcon icon="grip-lines-vertical" />
            </span>
            <Service service={service} isDraggable />
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableService;
