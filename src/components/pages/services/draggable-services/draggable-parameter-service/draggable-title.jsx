import React from "react";
import Title from "../../parameter-service/title";
import DraggableHorizontalLines from "../draggable-horizontal-lines";

const DraggableTitle = ({ title, shownState, isDragging }) => {
  const [isShown] = shownState;

  return (
    <>
      <Title shownState={shownState} title={title} />
      {!isShown && (
        <div className="draggable-service__lines">
          <DraggableHorizontalLines
            className={`draggable-service__icon ${
              isDragging ? "draggable-service__icon--dragging" : ""
            }`}
          />
        </div>
      )}
    </>
  );
};

export default DraggableTitle;
