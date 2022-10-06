import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import DraggableTitle from './draggable-title/draggable-title';
import DraggableSubService from './draggable-sub-service/draggable-sub-service';
import { reorderSubServices } from '../../../../../redux/slices/service/service';
import useIsHover from '../../hooks/use-is-hover';
import getHoverServiceParameterClassName from '../../utils/get-hover-service-parameter-class-name';

const DraggableParameterService = ({ service, index }) => {
  const [isShown, setIsShown] = useState(false);

  const [isSubServiceHover, subServiceEvents] = useIsHover();

  const dispatch = useDispatch();

  const { title, subServices } = service;

  const className = getHoverServiceParameterClassName({ isShown, isSubServiceHover });

  return (
    <Draggable isDragDisabled={isShown} draggableId={title} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
        <div
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
          className={`mt-6 card ${className}`}
        >
          <DraggableTitle
            title={title}
            isDragging={isDragging}
            shownState={[isShown, setIsShown]}
          />

          {isShown && (
            <DragDropContext onDragEnd={(res) => dispatch(reorderSubServices({ ...res, title }))}>
              <Droppable droppableId={`droppable-${title}`}>
                {({ droppableProps, innerRef, placeholder }) => (
                  <div ref={innerRef} {...droppableProps} className="services__droppable">
                    {subServices.map((subService, i) => (
                      <DraggableSubService
                        events={subServiceEvents}
                        subService={subService}
                        index={i}
                        key={title + subService.parameter}
                      />
                    ))}
                    {placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableParameterService;
