import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DraggableService from './draggable-service';
import DraggableParameterService from './draggable-parameter-service/draggable-parameter-service';
import { useDispatch } from 'react-redux';
import { reoderServices } from '../../../../../../redux/service/actions/service';

const DroppableServices = ({ services }) => {
  const dispatch = useDispatch();

  return (
    <DragDropContext onDragEnd={(res) => dispatch(reoderServices(res))}>
      <Droppable droppableId="droppable-services">
        {({ droppableProps, innerRef, placeholder }) => (
          <div ref={innerRef} {...droppableProps} className="services__droppable gc-f">
            {services.map((service, i) => {
              return service.subServices ? (
                <DraggableParameterService service={service} index={i} key={service.title} />
              ) : (
                <DraggableService service={service} index={i} key={service.id} />
              );
            })}
            {placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DroppableServices;
