import React, { useState, useCallback } from 'react';
import Modal from '../../../utils/modal';
import Carousel from './carousel/carousel';
import AddMasterWork from './add-master-work';
import EditMasterWork from './edit-master-work';
import DisplayMasterWorks from './display-master-works';

const MasterWorks = ({ onClickClose }) => {
  const [state, setState] = useState({ index: null, display: 'works' }); // works, carousel, update, add;

  const carouselOnClose = useCallback(() => setState({ index: null, display: 'works' }), [setState]);
  const masterWorksOnClose = useCallback(() => onClickClose(), [onClickClose]);

  return (
    <Modal onClickClose={state.display === 'carousel' ? carouselOnClose : masterWorksOnClose}>
      {state.display === 'works' && <DisplayMasterWorks setParentState={setState} />}
      {state.display === 'carousel' && <Carousel state={[state, setState]} />}
      {state.display === 'edit' && <EditMasterWork state={[state, setState]} />}
      {state.display === 'add' && <AddMasterWork setParentState={setState} />}
    </Modal>
  );
};

export default MasterWorks;
