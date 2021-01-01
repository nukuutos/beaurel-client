import React, { useState } from 'react';
import AddMasterWork from './add-master-work';
import Modal from '../../../utils/modal';
import EditMasterWorks from './edit-master-works';

const MastersWorksView = () => {
  const [isAddWork, setIsAddWork] = useState(false);

  return isAddWork ? <AddMasterWork setIsAddWork={setIsAddWork} /> : <EditMasterWorks setIsAddWork={setIsAddWork} />;
};

export default MastersWorksView;
