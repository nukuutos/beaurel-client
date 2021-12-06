import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../../../base/modal';
import Carousel from './carousel/carousel';
import AddMasterWork from './add-master-work';
import EditMasterWork from './edit-master-work';
import DisplayMasterWorks from './display-master-works';
import useMediaQuery from '../../../../../hooks/use-media-query';

const MasterWorks = ({ onClickClose }) => {
  const [state, setState] = useState({ index: null, display: 'works' }); // works, carousel, update, add;
  const isPhone = useMediaQuery(600);

  const carouselOnClose = useCallback(
    () => setState({ index: null, display: 'works' }),
    [setState]
  );
  const masterWorksOnClose = useCallback(() => onClickClose(), [onClickClose]);

  return (
    <Modal
      isMobileBackground
      onClickClose={state.display === 'carousel' ? carouselOnClose : masterWorksOnClose}
    >
      {isPhone && (
        <nav className="modal__back-bar card card--layout">
          <div className="back-bar__main back-bar__main--responsive">
            <FontAwesomeIcon
              onClick={state.display === 'carousel' ? carouselOnClose : masterWorksOnClose}
              className="back-bar__icon mr-6"
              icon="arrow-left"
            />
            Работы мастера
          </div>
        </nav>
      )}
      {state.display === 'works' && <DisplayMasterWorks setParentState={setState} />}
      {state.display === 'carousel' && <Carousel state={[state, setState]} />}
      {state.display === 'edit' && <EditMasterWork state={[state, setState]} />}
      {state.display === 'add' && <AddMasterWork setParentState={setState} />}
    </Modal>
  );
};

export default MasterWorks;
