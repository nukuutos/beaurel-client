import React, { useEffect } from 'react';
import MastersWorksView from './masters-works-view';
import { useSelector, useDispatch } from 'react-redux';
import { getWorksStart } from '../../../../redux/work/actions';
import UsersMasterWorksView from './users-master-works-view';
import Modal from '../../../utils/modal';
import Spinner from '../../../utils/spinner';

const MasterWorks = ({ onClickClose }) => {
  const [{ works, isLoading }, { isPublicView }] = useSelector((state) => [state.work, state.profile]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!works.length) dispatch(getWorksStart());
  }, []);

  return (
    <Modal onClickClose={onClickClose}>
      {isLoading ? (
        <div className="wrapper">
          <Spinner className="spinner--gc gc-f" />
        </div>
      ) : (
        <>{isPublicView ? <UsersMasterWorksView /> : <MastersWorksView />}</>
      )}
    </Modal>
  );
};

export default MasterWorks;
