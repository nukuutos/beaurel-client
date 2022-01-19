import { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../../../../base/modal';
import Carousel from './carousel/carousel';
import AddMasterWork from './add-master-work/add-master-work';
import EditMasterWork from './edit-master-work/edit-master-work';
import DisplayMasterWorks from './display-master-works/display-master-works';
import MobileModalHeading from '../../../../../base/modal/mobile-modal-heading';

const MasterWorks = ({ onClickClose }) => {
  const [state, setState] = useState({ index: null, display: 'works' });
  const { isPhone } = useSelector((state) => state.screenSize);

  const carouselOnClose = () => setState({ index: null, display: 'works' });

  const onClose = state.display === 'carousel' ? carouselOnClose : onClickClose;

  return (
    <Modal isMobileBackground onClickClose={onClose}>
      {isPhone && <MobileModalHeading onClickClose={onClose} title="Работы мастера" />}
      {state.display === 'works' && <DisplayMasterWorks setParentState={setState} />}
      {state.display === 'carousel' && <Carousel state={[state, setState]} />}
      {state.display === 'edit' && <EditMasterWork state={[state, setState]} />}
      {state.display === 'add' && <AddMasterWork setParentState={setState} />}
    </Modal>
  );
};

export default MasterWorks;
