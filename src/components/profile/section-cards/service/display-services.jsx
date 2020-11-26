import React, { useEffect } from 'react';
import Service from './service/service';
import ParameterService from './parameter-service/parameter-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { getServicesStart } from '../../../../redux/service/actions';
import Spinner from '../../../utils/spinner';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DisplayServices = ({ setIsAddService }) => {
  const dispatch = useDispatch();
  const [{ services, isLoading }, { isPublicView }] = useSelector((state) => [state.services, state.profile]); // add public view

  useEffect(() => {
    if (!services.length) dispatch(getServicesStart());
  }, []);

  return (
    <DragDropContext onDragEnd={(res) => console.log(res)}>
      <Droppable droppableId="droppable-services">
        {({ droppableProps, innerRef, placeholder }, snapshot) => (
          <main
            ref={innerRef}
            {...droppableProps}
            className="services services--display"
            style={{ background: snapshot.isDraggingOver ? 'lightblue' : 'white' }}>
            {isLoading ? (
              <Spinner className="spinner--gc gc-f" />
            ) : (
              <>
                <h2 className="services__heading gc-f mb-s-4">Services</h2>
                {services.length ? (
                  services.map((service, i) => {
                    return service.subServices ? (
                      <ParameterService service={service} key={i} />
                    ) : (
                      <Service service={service} key={i} />
                    );
                  })
                ) : (
                  <p className="services__first-service gc-f mb-m mt-s-4">
                    {isPublicView ? 'Sorry, no services yet!' : 'Add your first service!'}
                  </p>
                )}

                {!isPublicView && (
                  <div
                    className={`service--add gc-f ${services.length !== 0 ? 'mt-s-6' : ''}`}
                    onClick={() => setIsAddService(true)}>
                    <FontAwesomeIcon icon="plus" />
                  </div>
                )}
                {placeholder}
              </>
            )}
          </main>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DisplayServices;
