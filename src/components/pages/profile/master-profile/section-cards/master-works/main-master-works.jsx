import { useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../../../../base/modal/modal';
import Carousel from './carousel/carousel';
import AddMasterWork from './add-master-work/add-master-work';
import EditMasterWork from './edit-master-work/edit-master-work';
import DisplayMasterWorks from './display-master-works/display-master-works';
import MobileModalHeading from '../../../../../base/modal/mobile-modal-heading';
import useMasterWorksState from './hooks/use-master-works-state';

const MainMasterWorks = ({ onClickClose, isLoading }) => {
  const { isPhone } = useSelector((state) => state.screenSize);
  const [state, actions] = useMasterWorksState();
  const { closeCarousel } = actions;

  const onClose = state.display === 'carousel' ? closeCarousel : onClickClose;

  return (
    <Modal onClickClose={onClose}>
      {isPhone && <MobileModalHeading onClickClose={onClose} title="Работы мастера" />}
      {state.display === 'works' && <DisplayMasterWorks isLoading={isLoading} {...actions} />}
      {state.display === 'carousel' && <Carousel state={state} actions={actions} />}
      {state.display === 'edit' && <EditMasterWork state={state} {...actions} />}
      {state.display === 'add' && <AddMasterWork {...actions} />}
    </Modal>
  );
};

export default MainMasterWorks;
