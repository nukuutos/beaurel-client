import React from 'react';

import useManipulateWork from './use-manipulate-work';
import Pen from '../../../../../../base/icons/pen';
import Trash from '../../../../../../base/icons/trash';

const Sidenav = ({ className, state, setIsDeleting }) => {
  const [deleteWork, editWork] = useManipulateWork(state, setIsDeleting);

  return (
    <div className={className}>
      <div onClick={editWork} className="btn-icon mr-2">
        <Pen />
      </div>
      <div onClick={deleteWork} className="btn-icon btn-icon--fail">
        <Trash />
      </div>
    </div>
  );
};

export default Sidenav;
