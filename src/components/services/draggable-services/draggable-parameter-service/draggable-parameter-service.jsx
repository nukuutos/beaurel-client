import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import DraggableTitle from "./draggable-title";
import DraggableSubService from "./draggable-sub-service";
import { reoderSubServices } from "../../../../redux/service/actions/service";

const DraggableParameterService = ({ service, index }) => {
  const [isHover, setIsHover] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isHoverSubService, setIsHoverSubService] = useState(false);

  const dispatch = useDispatch();

  const { title, subServices } = service;

  return (
    <Draggable isDragDisabled={isShown} draggableId={title} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => {
        return (
          <div
            ref={innerRef}
            {...draggableProps}
            {...dragHandleProps}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={`mt-6 card ${isHover && isShown && !isHoverSubService ? "draggable-service--hover" : ""}`}
          >
            <div
              onClick={() => setIsShown(!isShown)}
              className={`service ${isShown ? "" : "draggable-service"} draggable-service-parameter--hover ${
                (isHover && !isShown) || isDragging ? "draggable-service--hover" : ""
              }`}
            >
              <DraggableTitle title={title} isDragging={isDragging} shownState={[isShown, setIsShown]} />
            </div>

            {isShown && (
              <DragDropContext
                onDragEnd={(res) => {
                  dispatch(reoderSubServices({ ...res, title }));
                }}
              >
                <Droppable droppableId={`droppable-${title}`}>
                  {({ droppableProps, innerRef, placeholder }) => {
                    return (
                      <div ref={innerRef} {...droppableProps} className="services__droppable">
                        {subServices.map((subService, i) => {
                          return (
                            <DraggableSubService
                              onMouseLeave={() => setIsHoverSubService(false)}
                              onMouseEnter={() => setIsHoverSubService(true)}
                              subService={subService}
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
