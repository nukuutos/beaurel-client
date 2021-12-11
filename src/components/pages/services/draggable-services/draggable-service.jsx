import { Draggable } from 'react-beautiful-dnd';
import Service from '../base/service';
import DraggableHorizontalLines from './utils/draggable-horizontal-lines';
import getDraggingIconClassName from './utils/get-dragging-icon-class-name';

const DraggableService = ({ service, index }) => {
  const { id } = service;

  return (
    <Draggable draggableId={id} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => {
        const className = getDraggingIconClassName(isDragging);

        return (
          <div
            ref={innerRef}
            {...draggableProps}
            {...dragHandleProps}
            className="draggable-service card service--hover service mt-6"
          >
            <Service service={service} />

            <div className="draggable-service__lines">
              <DraggableHorizontalLines className={className} />
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableService;
