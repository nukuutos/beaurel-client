import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import SubService from '../../../base/parameter-service/sub-service';
import DraggableHorizontalLines from '../../utils/draggable-horizontal-lines';
import getDraggingIconClassName from '../../utils/get-dragging-icon-class-name';
import getHoverSubServiceClassName from './get-hover-sub-service-class-name';

const DraggableSubService = ({ events, subService, index }) => {
  const [isHover, setIsHover] = useState(false);
  const { id } = subService;

  const { onMouseEnter, onMouseLeave } = events;

  const handleMouseEnter = () => {
    setIsHover(true);
    onMouseEnter();
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    onMouseLeave();
  };

  return (
    <Draggable draggableId={id} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => {
        const iconClassName = getDraggingIconClassName(isDragging);
        const hoverClassName = getHoverSubServiceClassName(isHover, isDragging);

        return (
          <div
            ref={innerRef}
            {...draggableProps}
            {...dragHandleProps}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`service draggable-service draggable-service-parameter__sub-service ${hoverClassName}`}
          >
            <SubService subService={subService} />
            <div className="draggable-service__lines">
              <DraggableHorizontalLines className={iconClassName} />
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableSubService;
