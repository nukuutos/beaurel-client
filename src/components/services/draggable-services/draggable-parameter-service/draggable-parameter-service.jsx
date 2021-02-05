import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import DraggableTitle from './draggable-title';
import DraggableSubService from './draggable-sub-service';
import { reoderSubServices } from '../../../../redux/service/actions/service';

const DraggableParameterService = ({ service, index }) => {
  const [isShown, setIsShown] = useState(false);
  const dispatch = useDispatch();

  const { title, subServices } = service;

  return (
    <Draggable isDragDisabled={isShown === true} draggableId={title} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }) => {
        return (
          <div
            className={`service-wrapper card mt-6`}
            onClick={() => setIsShown(!isShown)}
            ref={innerRef}
            {...draggableProps}
            {...dragHandleProps}>
            <div className={`service`}>
              <DraggableTitle title={title} shownState={[isShown, setIsShown]} />
            </div>
            {isShown && (
              <DragDropContext
                onDragEnd={(res) => {
                  dispatch(reoderSubServices({ ...res, title }));
                }}>
                <Droppable droppableId={`droppable-${title}`}>
                  {({ droppableProps, innerRef, placeholder }, { isDraggingOver }) => {
                    return (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        ref={innerRef}
                        {...droppableProps}
                        className="services__droppable">
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
