import React, { useEffect, useRef, useState } from 'react';
import MastersWorksView from './masters-works-view';
import { useSelector, useDispatch } from 'react-redux';
import { getWorksStart, getWorksSuccess } from '../../../../redux/work/actions';
import UsersMasterWorksView from './users-master-works-view';
import Modal from '../../../utils/modal';
import Spinner from '../../../utils/spinner';
import useAsyncAction from '../../../../hooks/useAsyncAction';

const MasterWorks = ({ onClickClose }) => {
  const [{ works }, { isPublicView, id: profileId }] = useSelector((state) => [state.work, state.profile]);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const getWorks = async () => {
    const config = {
      method: 'get',
      url: `/profile/${profileId}/work`,
      accessToken: null,
    };

    const works = await asyncAction(config);
    if (works) dispatch(getWorksSuccess(works));
  };

  useEffect(() => {
    if (!works.length) getWorks();
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
