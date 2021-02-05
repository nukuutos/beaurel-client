import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditServices from './edit-services/edit-services';
import DraggableServices from './draggable-services/draggable-services';
import Spinner from '../utils/spinner';

// MasterServices means that master has access to edit and reoder his services
const DragAndEditServices = ({ setIsAddService }) => {
  const [isReoder, setIsReoder] = useState(true);
  const { services, isLoading } = useSelector((state) => state.services); // add public view

  // return isLoading ? (
  //   <Spinner className="spinner--gc gc-f" />
  // ) : isReoder ? (
  //   <EditServices services={services} setIsAddService={setIsAddService} />
  // ) : (
  //   <DraggableServices services={services} />
  // );
};

export default DragAndEditServices;
