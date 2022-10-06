import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { reorderServices } from '../../../../redux/slices/service/service';
import DraggableService from './draggable-service';
import DraggableParameterService from './draggable-parameter-service/draggable-parameter-service';

const DroppableServices = () => {
  const { services } = useSelector((state) => state.services);
  const dispatch = useDispatch();

  return (
    <DragDropContext onDragEnd={(res) => dispatch(reorderServices(res))}>
      <Droppable droppableId="droppable-services">
        {({ droppableProps, innerRef, placeholder }) => (
          <div
            ref={innerRef}
            {...droppableProps}
            className="services__container services__container--droppable"
          >
            {services.map((service, i) =>
              service.subServices ? (
                <DraggableParameterService service={service} index={i} key={service.title} />
              ) : (
                <DraggableService service={service} index={i} key={service.id} />
              )
            )}
            {placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DroppableServices;
