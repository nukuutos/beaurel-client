import React, { useEffect } from 'react';
import MastersWorksMasterView from './master-works-master-view/masters-works-master-view';
import { useSelector, useDispatch } from 'react-redux';
import { getWorksSuccess } from '../../../../redux/work/actions';
import MasterWorksCustomerView from './master-works-customer-view';
import Modal from '../../../utils/modal';
import useAsyncAction from '../../../../hooks/useAsyncAction';
import { useRouter } from 'next/router';

const MasterWorks = ({ onClickClose }) => {
  const [{ works, masterId }, { isPublicView, id: profileId }] = useSelector((state) => [state.work, state.profile]);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();
  const router = useRouter();

  const getWorks = async () => {
    const config = {
      method: 'get',
      url: `/profile/${profileId}/work`,
      accessToken: null,
    };

    const data = await asyncAction(config);

    if (works) dispatch(getWorksSuccess({ works: data.works, masterId: profileId }));
  };

  useEffect(() => {
    const queryMasterId = router.query.id;
    const isWorks = masterId === queryMasterId;
    if (!isWorks) getWorks();
  }, []);

  return (
    <Modal onClickClose={onClickClose}>
      {isLoading ? (
        <div className="master-works">
          <div className="spinner-with-background" />
        </div>
      ) : (
        <>{isPublicView ? <MasterWorksCustomerView /> : <MastersWorksMasterView />}</>
      )}
    </Modal>
  );
};

export default MasterWorks;
