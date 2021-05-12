import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWorksSuccess } from '../../../../redux/work/actions';

const DisplayMasterWorks = ({ setParentState }) => {
  const [{ works, masterId }, { id: profileId }] = useSelector((state) => [state.work, state.profile]);
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
    <div className="master-works card">
      {isLoading && <div className="spinner-with-background" />}

      {works.map((work, index) => (
        // component
        <figure key={index} onClick={() => setParentState({ index, display: 'carousel' })} className="master-work">
          <img src={`http://localhost:5000/images/works/${work._id}.png`} className="master-work__img" />
          <figcaption className="master-work__title">{work.title}</figcaption>
        </figure>
      ))}
      <div onClick={() => setParentState((state) => ({ ...state, display: 'add' }))} className="master-works__add-work">
        <FontAwesomeIcon icon="plus" />
      </div>
    </div>
  );
};

export default DisplayMasterWorks;
