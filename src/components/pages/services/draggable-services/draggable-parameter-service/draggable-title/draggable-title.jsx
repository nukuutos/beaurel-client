import ParameterServiceTitle from '../../../base/parameter-service/parameter-service-title';
import DraggableHorizontalLines from '../../utils/draggable-horizontal-lines';
import getDraggingIconClassName from '../../utils/get-dragging-icon-class-name';
import getTitleClassName from './get-title-class-name';

const DraggableTitle = ({ title, shownState, isDragging }) => {
  const [isShown, setIsShown] = shownState;

  const iconClassName = getDraggingIconClassName(isDragging);
  const titleClassName = getTitleClassName({ isAbleToDragging: !isShown, isDragging });

  const toggleServiceParameter = () => setIsShown(!isShown);

  return (
    <div onClick={toggleServiceParameter} className={titleClassName}>
      <ParameterServiceTitle shownState={shownState} title={title} />
      {!isShown && (
        <div className="draggable-service__lines">
          <DraggableHorizontalLines className={iconClassName} />
        </div>
      )}
    </div>
  );
};

export default DraggableTitle;
