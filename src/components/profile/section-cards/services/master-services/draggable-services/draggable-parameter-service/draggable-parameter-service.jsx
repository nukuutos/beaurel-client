import React, { useState } from 'react';
import DraggableTitle from './draggable-title';
import DraggableSubService from './draggable-sub-service';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { reoderSubServices } from '../../../../../../../redux/service/actions';

const DraggableParameterService = ({ service, index }) => {
  const [isShown, setIsShown] = useState(false);
  const dispatch = useDispatch();

  const { title, subServices } = service;

  return (
    <Draggable isDragDisabled={isShown === true} draggableId={title} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }) => {
        return (
          <div ref={innerRef} {...draggableProps} {...dragHandleProps}>
            <DraggableTitle title={title} shownState={[isShown, setIsShown]} />
            {isShown && (
              <DragDropContext onDragEnd={(res) => dispatch(reoderSubServices({ ...res, title }))}>
                <Droppable droppableId="droppable-services">
                  {({ droppableProps, innerRef, placeholder }, { isDraggingOver }) => {
                    return (
                      <div ref={innerRef} {...droppableProps} className="services__droppable gc-f mb-s-4">
                        {subServices.map((subService, i) => {
                          return (
                            <DraggableSubService
                              subService={subService}
                              isLastService={i === subServices.length - 1}
                              index={i}
                              key={title + subService.parameter + i} // for dnd or use uuid
                            />
                          );
                        })}
                        {placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </DragDropContext>
            )}
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableParameterService;
