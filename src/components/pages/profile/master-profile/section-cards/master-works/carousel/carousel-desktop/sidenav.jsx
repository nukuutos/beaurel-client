import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useManipulateWork from '../use-manipulate-work';

const Sidenav = ({ state, setIsDeleting }) => {
  const [deleteWork, editWork] = useManipulateWork(state, setIsDeleting);

  return (
    <div className="carousel__sidenav">
      <div onClick={editWork} className="btn-icon mr-2">
        <FontAwesomeIcon icon="pen" />
      </div>
      <div onClick={deleteWork} className="btn-icon btn-icon--fail">
        <FontAwesomeIcon icon="trash" />
      </div>
    </div>
  );
};

export default Sidenav;
