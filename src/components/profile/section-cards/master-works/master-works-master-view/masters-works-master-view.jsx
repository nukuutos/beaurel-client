import React, { useState } from 'react';
import AddMasterWork from './add-master-work';
import EditMasterWorks from './edit-master-works/edit-master-works';

const MasterWorksMasterView = () => {
  const [isAddWork, setIsAddWork] = useState(false);

  return isAddWork ? <AddMasterWork setIsAddWork={setIsAddWork} /> : <EditMasterWorks setIsAddWork={setIsAddWork} />;
};

export default MasterWorksMasterView;
